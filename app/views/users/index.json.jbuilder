json.array!(@users) do |user|
  json.extract! user, :id, :fname, :lname, :uname, :passwd, :active, :group_id
  json.url user_url(user, format: :json)
end
