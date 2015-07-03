json.array!(@kinds) do |kind|
  json.extract! kind, :id, :name, :image_id
  json.url kind_url(kind, format: :json)
end
