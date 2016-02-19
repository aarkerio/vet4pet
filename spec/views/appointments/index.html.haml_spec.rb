

RSpec.describe "appointments/index", type: :view do
  before(:each) do
    assign(:appointments, [
      Appointment.create!(
        :pet => nil,
        :reminder => false,
        :reason_for_visit => "Reason For Visit",
        :doctor_id => 1
      ),
      Appointment.create!(
        :pet => nil,
        :reminder => false,
        :reason_for_visit => "Reason For Visit",
        :doctor_id => 1
      )
    ])
  end

  it "renders a list of appointments" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => "Reason For Visit".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
