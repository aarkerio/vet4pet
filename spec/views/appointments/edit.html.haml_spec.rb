
RSpec.describe "appointments/edit", type: :view do
  before(:each) do
    @appointment = assign(:appointment, Appointment.create!(
      :pet => nil,
      :reminder => false,
      :reason_for_visit => "MyString",
      :doctor_id => 1
    ))
  end

  it "renders the edit appointment form" do
    render

    assert_select "form[action=?][method=?]", appointment_path(@appointment), "post" do

      assert_select "input#appointment_pet_id[name=?]", "appointment[pet_id]"

      assert_select "input#appointment_reminder[name=?]", "appointment[reminder]"

      assert_select "input#appointment_reason_for_visit[name=?]", "appointment[reason_for_visit]"

      assert_select "input#appointment_doctor_id[name=?]", "appointment[doctor_id]"
    end
  end
end
