require 'rails_helper'

RSpec.describe "kinds/new", type: :view do
  before(:each) do
    assign(:kind, Kind.new(
      :name => "MyString",
      :image => nil
    ))
  end

  it "renders new kind form" do
    render

    assert_select "form[action=?][method=?]", kinds_path, "post" do

      assert_select "input#kind_name[name=?]", "kind[name]"

      assert_select "input#kind_image_id[name=?]", "kind[image_id]"
    end
  end
end
