# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

return if Recipient.any?

def short_country
  country = Faker::Address.country
  while country.length > 25
    country = Faker::Address.country
  end
  country
end

500.times do
  recipient = Recipient.new(first_name: Faker::Name.first_name,
                            last_name: Faker::Name.last_name,
                            age: [
                              Faker::Number.between(1, 18),
                              Faker::Number.between(1, 18),
                              Faker::Number.between(9, 92)
                            ].sample,
                            city: Faker::Address.city,
                            country: short_country,
                            nice: Faker::Boolean.boolean(0.7))

  nice_gifts = [
    Faker::Commerce.product_name,
    Faker::Commerce.product_name,
    "#{Faker::Dog.breed} Puppy",
    Faker::Vehicle.make_and_model,
    Faker::HarryPotter.book,
    Faker::Device.model_name
  ]

  naughty_gifts = ['Coal', 'Reindeer Poop', 'Tissues', 'Jigsaw Puzzle w/ Missing Pieces', 'Nickelback CD']

  recipient.gift = Gift.new(name: recipient.nice ? nice_gifts.sample : naughty_gifts.sample)
  recipient.save
end
