const BaseRepository = require('../src/repositories/base/baseRepository')

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  getRandomPositionFromArray(list) {
    return Math.floor(Math.random() * list.length)
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    return carCategory.carIds[randomCarIndex]
  }

  getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    return this.carRepository.find(carId)
  }
}

module.exports = CarService