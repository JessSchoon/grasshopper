class Recipe < ApplicationRecord
  serialize :ingredients
  serialize :directions
end
