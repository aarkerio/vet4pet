class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :group
  # new columns need to be added here to be writable through mass assignment
  #attr_accessible :username, :email, :password, :password_confirmation, :profile_attributes, :role

  #attr_accessor :password
  #before_save :prepare_password

  has_one :profile, validate: true
  has_many :appointments
  #has_many :pets, through: :profile

  #accepts_nested_attributes_for :profile

  #validates_presence_of :username
  #validates_uniqueness_of :username, :email, :allow_blank => true
  #validates_format_of :username, with: /^[-\w\._@]+$/i, allow_blank: true, message: "should only contain letters, numbers, or .-_@"
  #validates_format_of :email, with: /[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}\z/i
  #validates_presence_of :password, on: :create
  #validates_confirmation_of :password
  #validates_length_of :password, minimum: 4, allow_blank: true

  # login can be either username or email address
  def self.authenticate(login, pass)
    user = find_by_username(login) || find_by_email(login)
    return user if user && user.password_hash == user.encrypt_password(pass)
  end

  def encrypt_password(pass)
    BCrypt::Engine.hash_secret(pass, password_salt)
  end

  def role?(role_to_test)
    role == role_to_test.to_s
  end
  
  def name
    profile && profile.name ? profile.name : "Unknown"
  end

  private

  def prepare_password
    unless password.blank?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = encrypt_password(password)
    end
  end
end
