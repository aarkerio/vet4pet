require 'nokogiri'
require 'open-uri'


doc = File.open("blossom.xml") { |f| Nokogiri::XML(f) }

class Flattener

  def import
    doc = Nokogiri::XML(File.open("../lib/templates/Vital_Signs_Observations_GT.xml")) do |config|
      config.strict.nonet
    end
  end

end

