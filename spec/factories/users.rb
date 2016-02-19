FactoryGirl.define do
  factory :user do
    email { FFaker::Internet.email  }
    username { FFaker::Name.first_name  }
    fname 'Tom'
    lname 'Mixx'
    password 'password'
    password_confirmation 'password'
    group_id 1
  end
end
