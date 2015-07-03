require 'rails_helper'

RSpec.describe "kinds/index", type: :view do
  before(:each) do
    assign(:kinds, [
      Kind.create!(
        :name => "Name",
        :image => nil
      ),
      Kind.create!(
        :name => "Name",
        :image => nil
      )
    ])
  end

  it "renders a list of kinds" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
