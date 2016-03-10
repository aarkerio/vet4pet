require 'rails_helper'

RSpec.describe "images/edit", :type => :view do
  before(:each) do
    @image = assign(:image, Image.create!(
      :file => "MyString",
      :user => nil
    ))
  end

  it "renders the edit image form" do
    render

    assert_select "form[action=?][method=?]", image_path(@image), "post" do

      assert_select "input#image_file[name=?]", "image[file]"

      assert_select "input#image_user_id[name=?]", "image[user_id]"
    end
  end
end
