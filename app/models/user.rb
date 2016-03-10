class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :group
  # new columns need to be added here to be writable through mass assignment
  #attr_accessible :username, :email, :password, :password_confirmation, :profile_attributes, :role

  has_many :appointments

  validates_presence_of :username
  validates_uniqueness_of :username, :email, allow_blank: false

  def role?(role_to_test)
    role == role_to_test.to_s
  end

end
