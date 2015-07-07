require 'rails_helper'

RSpec.describe "Appointments", type: :request do
  describe "GET /appointments" do
    it "works! (now write some real specs)" do
      get appointments_path
      expect(response).to have_http_status(200)
    end
  end
end
