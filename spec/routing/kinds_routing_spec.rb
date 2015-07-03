require "rails_helper"

RSpec.describe KindsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/kinds").to route_to("kinds#index")
    end

    it "routes to #new" do
      expect(:get => "/kinds/new").to route_to("kinds#new")
    end

    it "routes to #show" do
      expect(:get => "/kinds/1").to route_to("kinds#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/kinds/1/edit").to route_to("kinds#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/kinds").to route_to("kinds#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/kinds/1").to route_to("kinds#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/kinds/1").to route_to("kinds#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/kinds/1").to route_to("kinds#destroy", :id => "1")
    end

  end
end
