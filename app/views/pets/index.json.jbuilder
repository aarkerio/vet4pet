json.array!(@pets) do |pet|
  json.extract! pet, :id, :name, :age, :image_id, :kind_id, :interned, :created, :tags, :user_id
  json.url pet_url(pet, format: :json)
end
