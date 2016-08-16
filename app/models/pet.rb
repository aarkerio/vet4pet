# Chipotle Software (c) MIT 2015-2016
class Pet < ApplicationRecord
  belongs_to :image
  belongs_to :kind
  belongs_to :user

  # Public: Returns pets
  #
  # id    - integer number.
  # owner - get pet(s) for owner or for appointment  
  #
  # Returns hash object or nil.
  def self.get_pets(id, owner)
    if owner
      pets = where(active:true, user_id: id).select(:id, :name)
    else
      appo = Appointment.find(id)
      pets = where(active:true, user_id: appo.owner_id).select(:id, :name)
    end
    pets.map do |p|
      self.react_order(p)
    end
  end

  private 

  # Private: Reorder to send the JSON to React.js view.
  #
  # appo - Active record object.
  #
  # Returns hash.
  def self.react_order(pet)
    {value: pet.id, label: pet.name }
  end
end
