# Chipotle Software (c) 2015-2016 MIT License

class PetsController < ApplicationController
  before_action :set_pet, only: [:show, :edit, :update, :destroy]

  before_action :check_admin, except: [:index, :welcome, :get_pets]

  # POST /get_pets
  def get_pets
    #return render json: params
    #logger.debug "PARAMS in get_pets   #{params}"
    if params['owner']
      pets = Pet.where(active:true, user_id: params['id']).select(:id, :name)
    else
      appo = Appointment.find(params['id'])
      pets = Pet.where(active:true, user_id: appo.owner_id).select(:id, :name)
    end
    return render json: pets
  end

  # GET /pets
  # GET /pets.json
  def index
    @pets = Pet.all
  end

  # GET /pets/1
  # GET /pets/1.json
  def show
  end

  # GET /pets/new
  def new
    @pet = Pet.new
  end

  # GET /pets/1/edit
  def edit
  end

  # POST /pets
  # POST /pets.json
  def create
    @pet = Pet.new(pet_params)

    respond_to do |format|
      if @pet.save
        format.html { redirect_to @pet, notice: 'Pet was successfully created.' }
        format.json { render :show, status: :created, location: @pet }
      else
        format.html { render :new }
        format.json { render json: @pet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pets/1
  # PATCH/PUT /pets/1.json
  def update
    respond_to do |format|
      if @pet.update(pet_params)
        format.html { redirect_to @pet, notice: 'Pet was successfully updated.' }
        format.json { render :show, status: :ok, location: @pet }
      else
        format.html { render :edit }
        format.json { render json: @pet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pets/1
  # DELETE /pets/1.json
  def destroy
    @pet.destroy
    respond_to do |format|
      format.html { redirect_to pets_url, notice: 'Pet was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pet
      @pet = Pet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pet_params
      params.require(:pet).permit(:name, :age, :image_id, :kind_id, :interned, :created, :tags, :user_id)
    end
end
