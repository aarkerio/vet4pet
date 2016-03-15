Rails.application.routes.draw do
  devise_for :users
  resources :pets
  resources :kinds
  resources :images
  resources :users
  resources :groups do
    collection do
      get 'export'
      get 'start'
    end
  end

  post '/appointments/get_data/'   => 'appointments#get_data',    :as => 'appo_get_data'
  post '/appointments/get_appos/'  => 'appointments#get_appos',   :as => 'appo_get_appos'
  get '/appointments/appo_delete/' => 'appointments#appo_delete', :as => 'appo_delete'
  get '/appointments/'             => 'appointments#index',       :as => 'appo_index'
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'kinds#welcome'
  
  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
