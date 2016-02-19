

describe KindsController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Kind. As you add validations to Kind, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # KindsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all kinds as @kinds" do
      kind = Kind.create! valid_attributes
      get :index, {}, valid_session
      expect(assigns(:kinds)).to eq([kind])
    end
  end

  describe "GET #show" do
    it "assigns the requested kind as @kind" do
      kind = Kind.create! valid_attributes
      get :show, {:id => kind.to_param}, valid_session
      expect(assigns(:kind)).to eq(kind)
    end
  end

  describe "GET #new" do
    it "assigns a new kind as @kind" do
      get :new, {}, valid_session
      expect(assigns(:kind)).to be_a_new(Kind)
    end
  end

  describe "GET #edit" do
    it "assigns the requested kind as @kind" do
      kind = Kind.create! valid_attributes
      get :edit, {:id => kind.to_param}, valid_session
      expect(assigns(:kind)).to eq(kind)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Kind" do
        expect {
          post :create, {:kind => valid_attributes}, valid_session
        }.to change(Kind, :count).by(1)
      end

      it "assigns a newly created kind as @kind" do
        post :create, {:kind => valid_attributes}, valid_session
        expect(assigns(:kind)).to be_a(Kind)
        expect(assigns(:kind)).to be_persisted
      end

      it "redirects to the created kind" do
        post :create, {:kind => valid_attributes}, valid_session
        expect(response).to redirect_to(Kind.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved kind as @kind" do
        post :create, {:kind => invalid_attributes}, valid_session
        expect(assigns(:kind)).to be_a_new(Kind)
      end

      it "re-renders the 'new' template" do
        post :create, {:kind => invalid_attributes}, valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested kind" do
        kind = Kind.create! valid_attributes
        put :update, {:id => kind.to_param, :kind => new_attributes}, valid_session
        kind.reload
        skip("Add assertions for updated state")
      end

      it "assigns the requested kind as @kind" do
        kind = Kind.create! valid_attributes
        put :update, {:id => kind.to_param, :kind => valid_attributes}, valid_session
        expect(assigns(:kind)).to eq(kind)
      end

      it "redirects to the kind" do
        kind = Kind.create! valid_attributes
        put :update, {:id => kind.to_param, :kind => valid_attributes}, valid_session
        expect(response).to redirect_to(kind)
      end
    end

    context "with invalid params" do
      it "assigns the kind as @kind" do
        kind = Kind.create! valid_attributes
        put :update, {:id => kind.to_param, :kind => invalid_attributes}, valid_session
        expect(assigns(:kind)).to eq(kind)
      end

      it "re-renders the 'edit' template" do
        kind = Kind.create! valid_attributes
        put :update, {:id => kind.to_param, :kind => invalid_attributes}, valid_session
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested kind" do
      kind = Kind.create! valid_attributes
      expect {
        delete :destroy, {:id => kind.to_param}, valid_session
      }.to change(Kind, :count).by(-1)
    end

    it "redirects to the kinds list" do
      kind = Kind.create! valid_attributes
      delete :destroy, {:id => kind.to_param}, valid_session
      expect(response).to redirect_to(kinds_url)
    end
  end

end
