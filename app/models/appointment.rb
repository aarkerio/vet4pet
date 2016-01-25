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
