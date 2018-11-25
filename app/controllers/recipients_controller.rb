# frozen_string_literal: true

class RecipientsController < ApplicationController
  def index
    @recipients = Recipient.includes(:gift).where(nice: params[:nice])
    render :index, layout: false
  end
end
