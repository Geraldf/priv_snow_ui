var fs = require("fs");

const w_json = (json, filename) => {
  var buf = JSON.stringify(json);
  fs.writeFile(filename, buf);
};

export default w_json;
