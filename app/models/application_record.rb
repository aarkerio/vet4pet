# Chipotle Software (c) 2016   MIT License 
class ApplicationRecord < ActiveRecord::Base

  # To load a module
  # include MyExtendedFeature

  # Tells Rails to not use `application_records` as table name for all classes inheriting
  # badname for than functionality BTW
  self.abstract_class = true
end
