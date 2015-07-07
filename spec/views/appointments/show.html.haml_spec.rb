require 'rails_helper'

RSpec.describe "appointments/show", type: :view do
  before(:each) do
    @appointment = assign(:appointment, Appointment.create!(
      :pet => nil,
      :reminder => false,
      :reason_for_visit => "Reason For Visit",
      :doctor_id => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(/false/)
    expect(rendered).to match(/Reason For Visit/)
    expect(rendered).to match(/1/)
  end
end
