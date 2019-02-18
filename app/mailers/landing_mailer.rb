# frozen_string_literal: true

class LandingMailer < ApplicationMailer
  def contact(inquiry, name, email, company, subject, message)
    @inquiry = inquiry
    @name = name
    @email = email
    @company = company
    @subject = subject
    @message = message

    mail to: "support@mailsnag.com", subject: "New inquiry"
  end
end
