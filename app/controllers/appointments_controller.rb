class AppointmentsController < ApplicationController
  before_action :set_appointment, only: [:show, :edit, :update, :destroy]

  # GET /appointments
  # GET /appointments.json
  def index
    @appos = Appointment.to_react
  end

  # POST /appointments/get_data
  def get_data
    owner = params[:ovalue]
    results = User.where("(fname ~ '#{owner}' OR lname ~ '#{owner}') AND group_id=2").select(:id, :fname, :lname)
    logger.debug "### get_data in appointments #####################>>>> #{params.to_json} "
    users = results.map do |r|
      {value: r.id, name: "#{r.lname} #{r.fname}" }
    end
    return render json: users.to_json
  end

  # GET /appointments/1
  # GET /appointments/1.json
  def show
  end

  # GET /appointments/new
  def new
    @appointment = Appointment.new
  end

  # GET /appointments/1/edit
  def edit
  end

  # POST /appointments
  # POST /appointments.json
  def create
    logger.debug "### Data in create#appointments #####################>>>> #{params.to_json} "
    #return render json: {name: 'Goooddd'}.to_json
    appointment = Appointment.new
    result = appointment.save_appointment(params)
    if result
      appos = Appointment.to_react
      return render json: appos.to_json
    else
      return render json: appointment.errors.to_json
    end
  end

  # PATCH/PUT /appointments/1
  # PATCH/PUT /appointments/1.json
  def update
    respond_to do |format|
      if @appointment.update(appointment_params)
        format.html { redirect_to @appointment, notice: 'Appointment was successfully updated.' }
        format.json { render :show, status: :ok, location: @appointment }
      else
        format.html { render :edit }
        format.json { render json: @appointment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /appointments/1
  # DELETE /appointments/1.json
  def destroy
    @appointment.destroy
    respond_to do |format|
      format.html { redirect_to appointments_url, notice: 'Appointment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_appointment
      @appointment = Appointment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def appointment_params
      params.require(:appointment).permit(:scheduled_time, :pet_id, :owner_id, :reminder, :reason_for_visit, :doctor_id)
    end
end
