class Appointment < ActiveRecord::Base
  belongs_to :pet
  belongs_to :doctor, class_name:  User
  belongs_to :owner, class_name:  User

  validates :scheduled_time, presence: true
  validate  :scheduled_time_cannot_be_in_the_past
  validates :doctor, presence: true
  validates :pet, presence: true
  validates :reason_for_visit, presence: true

  def scheduled_time_cannot_be_in_the_past
    if scheduled_time.present? && scheduled_time < DateTime.now
      errors.add(:scheduled_time, "cannot be in the past.")
    end
  end

  private

  # Private: Returns all appointments.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def self.save_appointment(params)
    owner    = get_row(params[:owner])
    doctor   = get_row(params[:doctor])
    pet      = User.where('LOWER(title) ILIKE ?', "#{params[:pet]}%").first
    new_appo = {scheduled_time: params[:date],
                pet_id: pet.id,
                reminder: params[:reminder],
                reason_for_visit: params[:reason],
                doctor_id: doctor.id,
                owner_id: owner.id,
                active: true
                }
    create!(new_appo)
  end

  def get_row(name)
    words = name.split(" ")
    user  = User.where('LOWER(fname) ILIKE ? AND LOWER(lname) ILIKE ?', "#{words[0]}%", "#{words[1]}%").first
  end

  # Private: Returns all appointments.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def self.to_react(appo_id=nil)
    appos = appo_id.nil? ? self.where(active:true).order('scheduled_time ASC') : self.where(active:true, id: appo_id)

    react = appos.map do |appo|
      react_order(appo)
    end
  end

  # Private: Reorder to send to React.js view.
  #
  # appo - Active record object.
  #
  # Returns hash.
  def self.react_order(appo)
    {id: appo.id, petname: appo.pet.name, owner: appo.owner.lname, docname: appo.doctor.lname, date: appo.scheduled_time.strftime('%Y-%m-%d %H-%M-%S'), reason: appo.reason_for_visit, reminder: appo.reminder }
  end
end
