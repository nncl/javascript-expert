const { describe, before, it, beforeEach, afterEach } = require('mocha')
const { join } = require('path')
const { expect } = require('chai')

const carDatabase = join(__dirname, './../../database/cars.json')
const CarService = require('../../services/car-service')
const sinon = require("sinon")

const mocks = {
  validCar: require('../mocks/valid-car.json'),
  validCarCategory: require('../mocks/valid-car-category.json'),
  validCustomer: require('../mocks/valid-customer.json'),
}

describe('CarService Suite tests', () => {
  let carService = {}
  let sandbox = {}

  before(() => {
    carService = new CarService({
      cars: carDatabase
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })


  it('should retrieve random position from array', () => {
    const list = [1, 2, 3, 4, 5]
    const result = carService.getRandomPositionFromArray(list)

    expect(result).to.be.lte(list.length).and.to.be.gte(0)
  })

  it('should choose the first id from carIds in carCategory', async () => {
    const carCategory = mocks.validCarCategory
    const carIdIndex = 0;

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIdIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIdIndex]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.true
    expect(result).to.be.equal(expected)
  })

  it('given a car category it should return an available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce).to.be.true
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.true
    expect(result).to.be.deep.equal(expected)
  })

})