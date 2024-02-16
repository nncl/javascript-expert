const File = require("./modules/01-mocks/src/file");
const { error } = require("./modules/01-mocks/src/constants");
const assert = require("assert");

(async () => {
  // Each variable which has been created within brackets are valid only on its scope

  {
    const filePath = "./modules/01-mocks/mocks/empty-file-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./modules/01-mocks/mocks/invalid-header.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./modules/01-mocks/mocks/five-items-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./modules/01-mocks/mocks/three-items-valid.csv";
    const expected = [
      { id: "1", name: "John Doe", profession: "Software Engineer", age: "30" },
      { id: "2", name: "Jane Doe", profession: "Software Engineer", age: "28" },
      { id: "3", name: "Jim Doe", profession: "Software Engineer", age: "26" }
    ];

    const result = await File.csvToJson(filePath);
    await assert.deepEqual(result, expected);
  }
})();
