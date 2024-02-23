const assert = require("assert");
const Service = require("./service");
const BASE_URL_1 = 'https://swapi.dev/api/planets/1';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2';
const { createSandbox, mock } = require('sinon')
const sinon = createSandbox();
const mocks = {
    alderaan: require('../mocks/alderaan.json'),
    tatooine: require('../mocks/tatooine.json'),
  }

;(async () => {
  const service = new Service();
  const stub = sinon.stub(
    service,
    service.makeRequest.name
  );

  stub.withArgs(BASE_URL_1).returns(mocks.tatooine);
  stub.withArgs(BASE_URL_2).returns(mocks.alderaan);

  {
    const expected = {
      name:"Tatooine",
      surfaceWater: "1",
      appearances: 5,
    };

    const results = await service.getPlanets(BASE_URL_1);
    assert.deepEqual(results, expected);
  }
  {
    const expected = {
      name:"Alderaan",
      surfaceWater: "40",
      appearances: 2,
    };

    const results = await service.getPlanets(BASE_URL_2);
    assert.deepEqual(results, expected);
  }
})()