# frozen_string_literal: true

module ApplicationHelper
  def client_base
    request.protocol + request.host + ":" + Figaro.env.client_dev_port
  end

  def render_js
    render html: "<!DOCTYPE html>
      <html>
        <head>
          <script>#{yield}</script>
        </head>
        <body></body>
      </html>".html_safe
  end
end
