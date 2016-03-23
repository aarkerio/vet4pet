# Chipotle Software (c) 2015-2016 MIT License
class AppointmentsController < ApplicationController

  #before_action :set_appointment, only: [:show, :edit, :update, :destroy]

  # GET /appointments
  def index
  end
  
  #GET ActionCable
  def broadcast
    appos = Appointment.to_react
    ActionCable.server.broadcast 'snippets', appos: appos
  end
  
  # POST /appointments/get_appos
  def get_appos
    appos = Appointment.to_getall(params['active'])
    logger.debug "### get_appos in appointments ##################>>>> #{params.to_json} "
    return render json: appos
  end

  # POST /appointments/get_data
  # Owners array to populate dinamically owners data list 
  def get_data
    owner = params[:ovalue]
    results = User.where("(fname ~ '#{owner}' OR lname ~ '#{owner}') AND group_id=2").select(:id, :fname, :lname)
    logger.debug "### get_data in appointments #####################>>>> #{params.to_json} "
    users = results.map do |r|
      {value: r.id, name: "#{r.lname} #{r.fname}" }
    end
    return render json: users.to_json
  end

  # POST /appointments
  def create
    logger.debug "### Data in create#appointments #####################>>>> #{params.to_json} "
   
    appointment = Appointment.new
    result = appointment.save_appointment(params)
    if result
      appos = Appointment.to_react
      return render :json, appos.to_json
    else
      return render :json, appointment.errors.to_json
    end
  end

  # PATCH/PUT /appointments/1
  def update
      logger.debug "### Data in PATCH create#appointments #####################>>>> #{params.to_json} "
      # {"id":"9","date":"2016-03-17 07-00-00","reminder":true,"owner":"Grimms","petname":"Babby","reason":"Vaccines","controller":"appointments","action":"update","appointment":{"id":9,"reminder":true}} 

      return render json: params
      if @appointment.update(params)
        render json: {status: :ok, message: 'Appointed updated', code: 00} 
      else
        render json: {status: :failed, errors: @appointment.errors, message: :unprocessable_entity, code: 044} 
      end
  end

  # GET /appointments/appo_delete/1
  def appo_delete
    appos = Appointment.to_react
    return render json: appos
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
      return 
      params.require(:appointment).permit(:scheduled_time, :pet_id, :owner_id, :reminder, :reason_for_visit, :doctor_id, :active, :id)
    end
end
