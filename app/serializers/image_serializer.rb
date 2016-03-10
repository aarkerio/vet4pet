class ImageSerializer < ActiveModel::Serializer
  attributes :id, :file
  has_one :user
end
