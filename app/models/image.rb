# Chipotle Software 2015-2016 (c) GPLv3
class Image < ActiveRecord::Base
  belongs_to :user

  mount_uploader :file, ImageUploader

  validates :file, presence: true

  validates :user, presence: true, on: :create, associated: true
end
