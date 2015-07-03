class Pet < ActiveRecord::Base
  belongs_to :image
  belongs_to :kind
  belongs_to :user
end
