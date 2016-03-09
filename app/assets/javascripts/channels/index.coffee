# Action Cable
# app/assets/javascripts/cable.coffee
#= require action_cable

@App = {}
App.cable = ActionCable.createConsumer("ws://cable.example.com")
