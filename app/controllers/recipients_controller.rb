# frozen_string_literal: true

class RecipientsController < ApplicationController
  def index
    @recipients = Recipient.includes(:gift).where(nice: params[:nice])
    @recipients = @recipients.order("#{params[:sort]} #{params[:order]}") if order_results?
    render :index, layout: false
  end

  private

  def order_results?
    params[:sort].present? && params[:order].present?
  end
end
