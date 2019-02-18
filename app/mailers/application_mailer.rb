# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  add_template_helper(EmailHelper)

  default from: "MailSnag Support <support@mailsnag.com>"
  layout "mailer"
end
