class ReportsController < ApplicationController
  before_action :check_read_only_mode, except: [:index, :show, :diff]
  before_action :authenticate_user!, except: :show
  before_action :moderators_only, only: [:index, :dismiss]

  before_action do
    @bots = 'noindex'
  end

  def new
    @report = Report.new(item: item, reporter: current_user, explanation_markup: current_user&.preferred_markup)
    previous_report = Report.unresolved.where(item: item, reporter: current_user).first
    redirect_to report_path(previous_report) if previous_report
  end

  def create
    @report = Report.new(report_params)
    @report.reporter = current_user
    @report.item = item
    if @report.item.is_a?(Script) && @report.script_url.present?
      script_from_input = get_script_from_input(@report.script_url, allow_deleted: true)
      if script_from_input.is_a?(Script)
        @report.reference_script = script_from_input
        @report.script_url = nil
      end
    end
    unless @report.save
      render :new
      return
    end

    if current_user.trusted_reports
      item.update!(review_reason: 'trusted') if @report.item.is_a?(Discussion) && @report.reason != Report::REASON_WRONG_CATEGORY
      item.discussion.update!(review_reason: 'trusted') if @report.item.is_a?(Comment) && @report.item.first_comment?
    end

    ScriptReportMailer.report_created(@report, site_name).deliver_later if @report.item.is_a?(Script)

    redirect_to report_path(@report), notice: t('reports.report_filed')
  end

  def index
    scope = Report
            .includes(:item)
            .order(:created_at)
    if params[:user_id].present?
      scope = scope.where(reporter_id: params[:user_id])
    else
      @show_separator = true
      scope = scope.unresolved
    end
    report_ids = scope
                 .sort_by { |r| [r.awaiting_response? ? 1 : 0, r.created_at] }
                 .reject { |r| r.item.nil? }
                 .map(&:id)
    @reports = Report
               .where(id: report_ids)
               .includes(:item, :reference_script, :reporter, :rebuttal_by_user)
    @reports = @reports.order(Arel.sql("FIELD(id, #{report_ids.join(',')})")) if report_ids.any?
    @reports = @reports.paginate(page: params[:page], per_page: per_page(default: 25))
    @bots = 'noindex'
  end

  def dismiss
    @report = Report.find(params[:id])
    @report.dismiss!(moderator_notes: params[:moderator_notes].presence)
    if @report.item.is_a?(Script) && !@report.auto_reporter
      ScriptReportMailer.report_dismissed_offender(@report, site_name).deliver_later
      ScriptReportMailer.report_dismissed_reporter(@report, site_name).deliver_later
    end
    redirect_to reports_path(anchor: "open-report-#{params[:index]}")
  end

  def mark_fixed
    @report = Report.find(params[:id])
    @report.fixed!(moderator_notes: params[:moderator_notes].presence)
    if @report.item.is_a?(Script) && !@report.auto_reporter
      ScriptReportMailer.report_fixed_offender(@report, site_name).deliver_later
      ScriptReportMailer.report_fixed_reporter(@report, site_name).deliver_later
    end
    redirect_to reports_path(anchor: "open-report-#{params[:index]}")
  end

  def uphold
    @report = Report.find(params[:id])

    user_is_script_author = user_is_script_author?(@report)

    unless user_is_script_author || current_user&.moderator?
      render_access_denied
      return
    end

    if @report.awaiting_response? && !user_is_script_author
      @text = 'Cannot uphold report, awaiting author response.'
      render 'home/error', status: :not_acceptable, layout: 'application'
      return
    end

    if user_is_script_author
      @report.uphold!(moderator: nil)
    else
      @report.uphold!(
        moderator: current_user,
        moderator_notes: params[:moderator_notes],
        ban_user: params[:ban] == '1' || params[:nuke].present?,
        delete_comments: params[:delete_comments] == '1' || params[:nuke].present?,
        delete_scripts: params[:delete_scripts] == '1' || params[:nuke].present?,
        redirect: params[:redirect] == '1'
      )
    end

    if @report.item.is_a?(Script) && !@report.auto_reporter
      ScriptReportMailer.report_upheld_offender(@report, site_name).deliver_later
      ScriptReportMailer.report_upheld_reporter(@report, user_is_script_author, site_name).deliver_later unless user_is_script_author
    end

    if user_is_script_author
      redirect_to script_path(@report.item)
    else
      redirect_to reports_path(anchor: "open-report-#{params[:index]}")
    end
  end

  def rebut
    @report = Report.find(params[:id])
    unless user_is_script_author?(@report) && @report.rebuttal.nil?
      render_access_denied
      return
    end

    rebuttal = params[:report][:rebuttal]

    if rebuttal.present?
      @report.rebut!(rebuttal: rebuttal, by: current_user)
      ScriptReportMailer.report_rebutted(@report, site_name).deliver_later
    end

    redirect_to report_path(@report), notice: 'A moderator will review this report and your explanation and make a decision.'
  end

  def show
    @report = Report.find(params[:id])
    @bots = 'noindex'
    render_404 unless @report.item
  end

  def diff
    report = Report.find(params[:id])
    render html: helpers.report_diff(report)
  end

  private

  def report_params
    params.require(:report).permit(:reason, :explanation, :explanation_markup, :script_url, :discussion_category_id, attachments: [])
  end

  def item
    case params[:item_class]
    when 'user'
      User.find(params[:item_id])
    when 'comment'
      Comment.find(params[:item_id])
    when 'discussion'
      Discussion.find(params[:item_id])
    when 'message'
      # Don't allow reporting a message in a conversation they're not involved in.
      Message.where(conversation: current_user.conversations).find(params[:item_id])
    when 'script'
      Script.find(params[:item_id])
    else
      render_404
    end
  end

  def user_is_script_author?(report)
    current_user && report.item.is_a?(Script) && report.item.users.include?(current_user)
  end
end
