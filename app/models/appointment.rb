#Chipotle Software (c) 2015-2016
class Appointment < ActiveRecord::Base
  belongs_to :pet
  belongs_to :doctor, class_name:  User
  belongs_to :owner, class_name:  User

  validates :date, presence: true
  validate  :date_cannot_be_in_the_past
  validates :doctor, presence: true
  validates :pet, presence: true
  validates :reason, presence: true
  
  scope :with_owners, lambda { |value| where('user_id = (?)', value) if value }

  def date_cannot_be_in_the_past
    if date.present? && date < DateTime.now
      errors.add(:date, "cannot be in the past.")
    end
  end

  # Public: Sabe a new appointment.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def save_appointment(params)
    owner    = get_user(params[:owner])
    doctor   = get_user(params[:doctor])
    if owner.nil? || doctor.nil?
      self.errors.add(:base, "Owner or Doctor no valid")
      #self.errors[:base] << "Owner or Doctor no valid"
      return false
    else
      pet = get_user(params[:name], owner.id.to_s)
    end

    new_appo = {date: params[:date],
                pet_id: pet.id,
                reminder: params[:reminder],
                reason: params[:reason],
                doctor_id: doctor.id,
                owner_id: owner.id,
                active: true
                }
    create!(new_appo)
  end

  private

  # Private: Returns all appointments.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def get_user(name)
    words = name.split(" ")
    User.where('LOWER(fname) ILIKE ? AND LOWER(lname) ILIKE ?', "#{words[0]}%", "#{words[1]}%").first
  end

  # Private: Returns all appointments.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def get_pet(name, owner_id)
    Pet.where("LOWER(name) ILIKE ? AND user_id= ?", name.downcase, owner_id).first
  end

  # Private: Returns all appointments.
  #
  # active - boolean, active or inactive appointments.
  #
  # Returns array object or nil.
  def self.get_all(active)
    logger.debug "### Appo id ##############>>>> #{active} "
    appos = self.where({active: active}).order('date ASC').limit(20)

    appos.map do |appo|
      react_order(appo)
    end
  end

  # Private: Returns aone appointment.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def self.get_one(id)
    logger.debug "### id in Model get_one ##############>>>> #{id} "
    appo = self.find(id)

    react_order(appo)
  end
  # Private: Reorder to send the JSON to React.js view.
  #
  # appo - Active record object.
  #
  # Returns hash.
  def self.react_order(appo)
    {id: appo.id, pet_id: appo.pet_id, owner_id: appo.owner_id, doctor_id: appo.doctor_id, pet_name: appo.pet.name, owner_name: appo.owner.lname, doc_name: appo.doctor.lname, date: appo.date.strftime('%Y-%m-%d %H-%M-%S'), reason: appo.reason, reminder: appo.reminder, active: appo.active }
  end
end
