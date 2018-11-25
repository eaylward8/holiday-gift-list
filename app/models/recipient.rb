# frozen_string_literal: true

class Recipient < ApplicationRecord
  has_one :gift

  def name
    "#{first_name} #{last_name}"
  end
end
