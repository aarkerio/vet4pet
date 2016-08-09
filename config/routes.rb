# Chipotle Software (c) 2015-2016 MIT License

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    devise_for :users
 
  resources :kinds
  resources :images
  resources :pets do
    collection do
      post 'get_pets'
    end
  end

  resources :appointments do
    collection do
      patch 'update'
      post  'get_data' 
      post  'get_appos' 
      post  'get_one_appo'
      get   'appo_delete'
      get   'fulfill_form'
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
