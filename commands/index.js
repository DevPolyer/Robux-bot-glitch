var normalizedPath = require("path").join(__dirname, "../commands");

const { readdirSync } = require("fs")

for (folder of readdirSync(normalizedPath).filter(folder => folder !== "index.js")) {
  for (file of readdirSync(normalizedPath+ "/" + folder)) {
    var name = file.replace('.js', '');
    const cmd =  require("../commands/"+folder+"/"+file);
    module.exports[name] = cmd
  }
}
// var name = file.replace('.js', '');
//   exports[name] = require("../commands/" + file);
// });