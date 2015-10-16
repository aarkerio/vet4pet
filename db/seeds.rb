# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

groups = %w(admin owners doctors staff)

groups.each do |group|
  Group.create! name: group, description: group
end

u = User.new(username: 'admin', email: 'admin@example.com', :password: 'password', password_confirmation: 'password', group_id: 1)
u.build_profile
u.profile.name = "Owner"
u.save


