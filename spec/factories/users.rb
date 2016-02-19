FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    fname 'Tom'
    lname 'Mixx'
    password 'password'
    password_confirmation 'password'
    group_id 1
  end
end
