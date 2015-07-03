require 'rails_helper'

RSpec.describe "pets/index", type: :view do
  before(:each) do
    assign(:pets, [
      Pet.create!(
        :name => "Name",
        :age => "",
        :image => nil,
        :kind => nil,
        :interned => false,
        :tags => "Tags",
        :user => nil
      ),
      Pet.create!(
        :name => "Name",
        :age => "",
        :image => nil,
        :kind => nil,
        :interned => false,
        :tags => "Tags",
        :user => nil
      )
    ])
  end

  it "renders a list of pets" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => "Tags".to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
