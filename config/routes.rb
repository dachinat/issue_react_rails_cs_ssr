Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "react_renderer#index"

  mount ActionCable.server => "/cable"

  # Devise routes
  devise_for :users, controllers: {
      sessions: "users/sessions",
      confirmations: "users/confirmations",
      registrations: "users/registrations",
      passwords: "users/passwords",
      unlocks: "users/unlocks",
      omniauth_callbacks: "users/omniauth_callbacks"
  }

  # Devise custom routes
  devise_scope :user do
    get "users/current_user", to: "users/sessions#current"
  end

  # Mailbox resources
  resources :mailboxes, except: %i[new edit] do
    post :reset, on: :member
    get :messages, on: :member
    patch :orders, on: :member
    put :read_all, on: :member
    delete :clear, on: :member
  end

  # Messages actions
  resources :messages, only: %i[show destroy] do
    member do
      patch :read
      post :share
      delete :unshare
      get :eml, to: "messages#download_eml"
      get "attachment/:generated_file_name", to: "messages#download_attachment", constraints:
          { generated_file_name: /[^\/]+/ }
      get :raw_iframe
      get "view/:cid", to: "messages#view_attachment", constraints: { cid: /[^\/]+/ }
    end
  end

  resources :messages, only: [], param: :token, path: "messages/shared" do
    member do
      get "", to: "messages#shared"
      get :eml, to: "messages#download_eml"
      get "attachment/:generated_file_name", to: "messages#download_attachment", constraints:
          { generated_file_name: /[^\/]+/ }
      get :raw_iframe
      get "/view/:cid", to: "messages#view_attachment", constraints: { cid: /[^\/]+/ }
    end
  end

  # Contact
  post "contact", to: "landing#contact"

  # React rendering (EOF)
  get "(*path)", to: "react_renderer#index"
end
