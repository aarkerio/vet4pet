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

unless User.exists?(username: "admin")
  admin  = User.create! username: "admin", email: "admin@example.com", password: 'password', fname: 'admin', lname: 'admin', group_id: admin.id
end

doctor = User.create! username: "doctor_#{Random.rand(1000)}", email: "adoc_#{Random.rand(1000)}@exale.com", password: 'password', fname: 'Ric doctor', lname: 'Grimms', group_id: doctors.id
owner_1  = User.create! username: "Manuel_#{Random.rand(1000)}", email: "owner_#{Random.rand(1000)}@eample.com", password: 'password', fname: 'Manuel', lname: 'Grimms', group_id: owners.id
owner_2  = User.create! username: "Mario_#{Random.rand(1000)}", email: "owggh_#{Random.rand(1000)}@exmple.com", password: 'password', fname: 'Mario', lname: 'Soto', group_id: owners.id
owner_3  = User.create! username: "Lon_#{Random.rand(1000)}", email: "osusan_#{Random.rand(1000)}@exnnple.com", password: 'password', fname: 'Susan', lname: 'McCarthy', group_id: owners.id

pet_1  = Pet.create! name: 'Babby', age: 4, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_1.id
pet_2  = Pet.create! name: 'Totopo', age: 3, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_1.id
pet_3  = Pet.create! name: 'Max', age: 4, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_2.id
pet_4  = Pet.create! name: 'Sally', age: 3, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_2.id
pet_4  = Pet.create! name: 'Wacky', age: 8, kind_id: kind.id, interned: false,  created: Time.now, user_id: owner_3.id

appo1 = {
  date: 2.days.from_now.change(hour: 7),
  pet_id: pet_1.id,
  reminder:  true,
  active:  true,
  reason: 'pain in leg',
  doctor_id: doctor.id,
  owner_id: owner_1.id
}

u1 = Appointment.create! appo1

appo2 = {
  date: 10.days.from_now.change(hour: 7),
  pet_id: pet_2.id,
  reminder:  true,
  active:  true,
  reason: 'Allergic itchy',
  doctor_id: doctor.id,
  owner_id: owner_1.id
}

u2 = Appointment.create! appo2

appo3 = {
  date: 9.days.from_now.change(hour: 7),
  pet_id: pet_2.id,
  reminder:  true,
  active:  true,
  reason: 'Vaccines',
  doctor_id: doctor.id,
  owner_id: owner_3.id
}

u2 = Appointment.create! appo3
