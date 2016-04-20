#Chipotle Software (c) 2016 MIT License

require 'nokogiri'
require 'open-uri'

class Flattener
  
  def initialize(get_file)
    @gt_file  = "./templates/Vital_Signs_Observations_GT.xml"
    @xsd_file = './templates/Template.xsd'
  end
  
  def import
    doc = Nokogiri::XML(File.open(@gt_file)) do |config|
      config.strict.nonet
    end
  end

  def validate(root_element)
    schema = Nokogiri::XML::Schema(File.read(schema_path))
    document = Nokogiri::XML(File.read(document_path))
    schema.validate(document.xpath("//#{root_element}").to_s)
  end

  def check_xsd
    validate('input.xml', './templates/Template.xsd', 'container').each do |error|
    puts error.message
  end
end

