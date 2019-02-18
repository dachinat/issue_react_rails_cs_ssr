# frozen_string_literal: true

class MessagesController < ApplicationController
  before_action :authenticate_user!, except: %i[shared download_attachment download_eml raw_iframe view_attachment]

  before_action :set_message, only: %i[show read download_attachment download_eml raw_iframe view_attachment destroy
  share unshare], if: -> { params[:id] }

  before_action :set_shared_message, only: %i[show download_attachment download_eml raw_iframe view_attachment shared],
                if: -> { params[:token] }

  def show
    response.headers["Cache-Control"] = "no-cache, no-store"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
    respond_with(@message)
  end

  def read
    if @message.update_attributes(read: true)
      respond_with({ error: false }, { location: nil })
    else
      respond_with({ error: true, message: @message.errors }, { location: nil })
    end
  end

  def download_attachment
    tmp_dir = @message.source.split("/")[0..-2].join("/")

    attachment = @message.attachments.find do |att|
      att["generatedFileName"] == params[:generated_file_name]
    end

    if attachment
      send_data Base64.strict_encode64(File.read("#{tmp_dir}/#{attachment["contentId"]}")), disposition: :inline
    end
  end

  def download_eml
    send_data Base64.strict_encode64(File.read(@message.source)), disposition: :inline
  end

  def raw_iframe
    render html: "<pre style=\"font-size:12px; font-family: Consolas, Menlo, Courier, monospace;
                  color:rgba(0, 0, 0, 0.65); line-height: 1.5;\">#{CGI.escapeHTML(File.read(@message.source))}</pre>"
                     .html_safe
  end

  def view_attachment
    tmp_dir =  @message.source.split("/")[0..-2].join("/")
    attachment = @message.attachments.find { |att| att["contentId"] == params[:cid ] }

    source = "#{tmp_dir}/#{attachment["contentId"]}"

    send_file source, disposition: :inline, type: attachment["contentType"], filename: attachment["contentId"]
  end

  def destroy
    if @message.destroy
      respond_with({ error: false }, { location: nil })
    else
      respond_with({ error: true, message: @message.errors }, { location: nil })
    end
  end

  def share
    if @message.create_message_share(valid_until: message_params[:shared_until]).save!
      respond_with({ error: false }, { location: nil })
    else
      respond_with({ error: true, message: @message.errors }, { location: nil })
    end
  end

  def unshare
    if @message.message_share.destroy
      respond_with({ error: false }, { location: nil })
    else
      respond_with({ error: true, message: @message.message_share.errors }, { location: nil })
    end
  end

  def shared
    set_shared_message

    if @message
      respond_with(@message, serializer: SharedMessageSerializer)
    else
      respond_with(nil)
    end
  end

  private

    def set_message
      @message = current_user.messages.find_by(id: params[:id])
    end

    def set_shared_message
      @message = MessageShare.where("token = ? AND valid_until >= ?", params[:token], DateTime.current)&.first&.message
      # unless @message
      #   respond_with(nil) and return
      # end
    end

    def message_params
      params.require(:message).permit(:shared_until)
    end
end
