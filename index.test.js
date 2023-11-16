const File = require("./modules/01-mocks/src/file");
const { error } = require("./modules/01-mocks/src/constants");
const assert = require("assert");

(async () => {
  // Each variables which has been cerated within breackets are valid only on its scope

  {
    const filePath = "./modules/01-mocks/mocks/three-items-valid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
})();
