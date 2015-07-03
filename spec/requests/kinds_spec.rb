require 'rails_helper'

RSpec.describe "Kinds", type: :request do
  describe "GET /kinds" do
    it "works! (now write some real specs)" do
      get kinds_path
      expect(response).to have_http_status(200)
    end
  end
end
