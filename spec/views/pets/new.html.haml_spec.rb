require 'rails_helper'

RSpec.describe "pets/new", type: :view do
  before(:each) do
    assign(:pet, Pet.new(
      :name => "MyString",
      :age => "",
      :image => nil,
      :kind => nil,
      :interned => false,
      :tags => "MyString",
      :user => nil
    ))
  end

  it "renders new pet form" do
    render

    assert_select "form[action=?][method=?]", pets_path, "post" do

      assert_select "input#pet_name[name=?]", "pet[name]"

      assert_select "input#pet_age[name=?]", "pet[age]"

      assert_select "input#pet_image_id[name=?]", "pet[image_id]"

      assert_select "input#pet_kind_id[name=?]", "pet[kind_id]"

      assert_select "input#pet_interned[name=?]", "pet[interned]"

      assert_select "input#pet_tags[name=?]", "pet[tags]"

      assert_select "input#pet_user_id[name=?]", "pet[user_id]"
    end
  end
end
