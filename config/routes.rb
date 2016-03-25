Rails.application.routes.draw do
  devise_for :users
  resources :pets
  resources :kinds
  resources :images
  resources :appointments do
    collection do
      patch 'update'
      post  'get_data' 
      post  'get_appos' 
      post  'get_one_appo'
      get   'appo_delete'
    end
  end

  resources :users do
    collection do
      post 'get_bygroup'
    end
  end

  resources :groups do
    collection do
      get 'export'
      get 'start'
    end
  end
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'kinds#welcome'
  
  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
