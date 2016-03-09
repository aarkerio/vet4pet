// Action Cable Client
//= require cable
//= require_self
//= require_tree .

this.App = {};

App.cable = Cable.createConsumer('ws://127.0.0.1:28080');


