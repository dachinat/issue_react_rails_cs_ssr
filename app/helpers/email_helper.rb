# frozen_string_literal: true

module EmailHelper
  def email_image_tag(image, **options)
    attachments[image] = File.read(Rails.root.join("public/#{image}"))
    image_tag attachments[image].url, **options
  end

  def skip_footer!
    @skip_footer = true
  end

  def skip_footer?
    @skip_footer
  end

  def with_base_url(path)
    url = Rails.application.config.action_mailer.default_url_options
    port = url[:port] ? ":#{url[:port]}" : ""
    "#{url[:protocol]}://#{url[:host]}#{port}/#{path}"
  end
end
