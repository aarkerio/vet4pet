
class Pet < ActiveRecord::Base
  belongs_to :image
  belongs_to :kind
  belongs_to :user


  # Public: Returns pets
  #
  # appo_id - The Integer number of appointemnt id.
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
