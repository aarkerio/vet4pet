class Appointment < ActiveRecord::Base
  belongs_to :pet
  belongs_to :customer, :class_name => User
  belongs_to :doctor, :class_name => User

  validates :scheduled_time, :presence => true
  validate  :scheduled_time_cannot_be_in_the_past
  validates :customer, :presence => true
  validates :doctor, :presence => true
  validates :pet, :presence => true
  validates :reason_for_visit, :presence => true

  def scheduled_time_cannot_be_in_the_past
    if scheduled_time.present? && scheduled_time < DateTime.now
      errors.add(:scheduled_time, "cannot be in the past.")
    end
  end
end
