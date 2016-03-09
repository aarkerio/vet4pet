# app/channels/snippets_channel.rb

class SnippetsChannel < ApplicationCable::Channel  
  def subscribed
    stream_from 'snippets'
  end
end  
