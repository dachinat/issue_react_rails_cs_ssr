# frozen_string_literal: true

class MailboxesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_mailbox, only: %i[show update destroy reset messages orders read_all clear]

  def index
    respond_with current_user.mailboxes.order(order: :asc)
  end

  def show
    respond_with @mailbox
  end

  def create
    @mailbox = Mailbox.new(mailbox_params)

    if @mailbox.save
      respond_with({ error: false, result: @mailbox }, { location: nil })
    else
      respond_with({ error: true, message: @mailbox.errors }, { location: nil })
    end
  end

  def update
    if @mailbox.update(mailbox_params)
      respond_with({ error: false, result: @mailbox }, { location: nil })
    else
      respond_with({ error: true, message: @mailbox.errors }, { location: nil })
    end
  end

  def reset
    if @mailbox.generate_credentials
      respond_with({ error: false, result: @mailbox }, { location: nil })
    else
      respond_with({ error: true, message: @mailbox.errors }, { location: nil })
    end
  end

  def messages
    respond_with(@mailbox.messages.order(order: :asc))
  end

  def orders
    if @mailbox.messages.update_orders(mailbox_params[:orders])
      respond_with({ error: false }, { location: nil })
    else
      respond_with({ error: true, message: @mailbox.errors }, { location: nil })
    end
  end

  def read_all
    if @mailbox.messages.read_all
      respond_with({ error: false }, { location: nil })
    else
      respond_with({ error: true, message: @mailbox.errors }, { location: nil })
    end
  end

  def clear
    if @mailbox.messages.destroy_all
      respond_with({ error: false }, { location: nil })
    else
      respond_with({ error: true, message: @mailbox.errors }, { location: nil })
    end
  end

  def destroy
    if @mailbox.destroy
      respond_with({ error: false }, { location: nil })
    else
      respond_with({ error: true, message: @mailbox.errors }, { location: nil })
    end
  end

  private

    def set_mailbox
      @mailbox = current_user.mailboxes.find(params[:id])
    end

    def mailbox_params
      params.require(:mailbox).permit(
        :name, :username, :password, :order, :error_rate, :delay_sec, orders: []
      ).merge(user_id: current_user.id)
    end
end
