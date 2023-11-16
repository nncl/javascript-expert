const { readFile } = require("fs/promises");

class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, "utf8");
    console.log({ content });
  }
}

module.exports = File;
