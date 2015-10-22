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

  def self.to_react
    appos = self.where(active:true).order('scheduled_time DESC')
    react = appos.map do |appo|
      {id: appo.id, petname: appo.pet.name, owner: appo.owner.lname, docname: appo.doctor.lname, date: appo.scheduled_time.strftime('%Y-%m-%d %H-%M-%S'), reason: appo.reason_for_visit, reminder: appo.reminder  }
    end
  end
end
