# Chipotle Software 2015-2016 (c) MIT License

class ApplicationController < ActionController::Base
  
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  # protect_from_forgery except: [:index, :get_appos]
  #before_action :authenticate_user!, except: [:welcome]

  before_action :layout_by_action

  before_action :check_admin

  @@actions = %w(new edit create destroy update index start show angular neu)

  FILE_EXTENSIONS = ['wav','mp3','gsm','pdf', 'doc', 'docx', 'pptx', 'xls', 'xlsx', 'zip']   # Allowed file extensions

  MIME_TYPES = ['image/jpeg', 'image/gif','image/png','image/bmp', 'application/pdf']         # Allowed upload file types

  FILE_MAXIMUM_SIZE_FOR_FILE=1048576    #Maximum Size (1MB) define in bytes

  private

  def check_admin
    if  @current_user && @current_user.group.id != 1
      redirect_to root_path, notice: 'User not authorized'
    end
  end

  # Layout for action
  def layout_by_action
    action =
      if @@actions.include? params[:action]
        self.class.layout 'admin'
      else
        self.class.layout 'application'
      end
  end
end
