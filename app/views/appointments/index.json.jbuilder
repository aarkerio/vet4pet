json.array!(@appointments) do |appointment|
  json.extract! appointment, :id, :scheduled_time, :pet_id, :reminder, :reason_for_visit, :doctor_id
  json.url appointment_url(appointment, format: :json)
end
