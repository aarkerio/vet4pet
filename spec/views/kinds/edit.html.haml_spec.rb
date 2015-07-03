require 'rails_helper'

RSpec.describe "kinds/edit", type: :view do
  before(:each) do
    @kind = assign(:kind, Kind.create!(
      :name => "MyString",
      :image => nil
    ))
  end

  it "renders the edit kind form" do
    render

    assert_select "form[action=?][method=?]", kind_path(@kind), "post" do

      assert_select "input#kind_name[name=?]", "kind[name]"

      assert_select "input#kind_image_id[name=?]", "kind[image_id]"
    end
  end
end
