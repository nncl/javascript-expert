const { join } = require('path')
const { writeFile } = require('fs/promises')
const { faker } = require("@faker-js/faker");

const Car = require('../src/entities/car')
const CarCategory = require('../src/entities/car-category')
const Customer = require('../src/entities/customer')

const seeder_base_folder = join(__dirname, '../', 'database')
const ITEMS_AMOUNT = 2;

const id = () => faker.database.mongodbObjectId();

const carCategory = new CarCategory({
  id: id(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount({ min: 20, max: 100 })
})

const cars = [];
const customers = [];
for (let index = 0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: id(),
    name: faker.vehicle.model(),
    releaseYear: faker.date.past().getFullYear(),
    available: true,
    gasAvailable: true,
  })

  carCategory.carIds.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: id(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 80 })
  })

  customers.push(customer);
}

const write = (filename, data) => writeFile(
    join(seeder_base_folder, filename), JSON.stringify(data)
  )

;(async () => {
  await write('cars.json', cars)
  await write('car-categories.json', [carCategory])
  await write('customers.json', customers)
})();

