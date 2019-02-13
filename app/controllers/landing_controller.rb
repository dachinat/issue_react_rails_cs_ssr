class LandingController < ApplicationController
  def index

  end

  def contact
    LandingMailer.contact(
        contact_params[:inquiry], contact_params[:name], contact_params[:email], contact_params[:company],
        contact_params[:subject], contact_params[:message]
    ).deliver_now
  end

  def contact_params
    params.require(:contact).permit(:inquiry, :name, :email, :company, :subject, :message)
  end
end
