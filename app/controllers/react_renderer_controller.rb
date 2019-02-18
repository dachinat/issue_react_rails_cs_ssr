class ReactRendererController < ApplicationController
  def index
    render ({ component: "App", props: { path: request.path }, prerender: false })
  end
end