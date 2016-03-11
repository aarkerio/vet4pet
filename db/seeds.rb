# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

 admin   = Group.create! name: 'admin', description: 'admin'
 owners  = Group.create! name: 'owners', description: 'owners'
 doctors = Group.create! name: 'doctors', description: 'doctors'
 staff   = Group.create! name: 'staff', description: 'staff'


kinds = %w(cat dog reptile bird)

kinds.each do |kind|
  Kind.create! name: kind
end

kind = Kind.find_by_name 'dog'

admin  = User.create! username: 'admin', email: 'admin@example.com', password: 'password', fname: 'admin', lname: 'admin', group_id: admin.id
doctor = User.create! username: 'doctor', email: 'adoc@example.com', password: 'password', fname: 'Ric doctor', lname: 'Grimms', group_id: doctors.id
owner_1  = User.create! username: 'Manuel', email: 'owner@example.com', password: 'password', fname: 'Manuel', lname: 'Grimms', group_id: owners.id
owner_2  = User.create! username: 'Mario', email: 'owggh@example.com', password: 'password', fname: 'Mario', lname: 'Soto', group_id: owners.id

pet_1  = Pet.create! name: 'Babby', age: 4, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_1.id
pet_2  = Pet.create! name: 'Totopo', age: 3, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_1.id
pet_3  = Pet.create! name: 'Max', age: 4, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_2.id
pet_4  = Pet.create! name: 'Sally', age: 3, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_2.id


appo1 = {
  scheduled_time: 2.days.from_now.change(hour: 7),
  pet_id: pet_1.id,
  reminder:  true,
  active:  true,
  reason_for_visit: 'Vaccines',
  doctor_id: doctor.id,
  owner_id: owner_1.id
}

u1 = Appointment.create! appo1

appo2 = {
  scheduled_time: 10.days.from_now.change(hour: 7),
  pet_id: pet_2.id,
  reminder:  true,
  active:  true,
  reason_for_visit: 'Vaccines',
  doctor_id: doctor.id,
  owner_id: owner_1.id
}

u2 = Appointment.create! appo2
