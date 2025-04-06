const path = require('path');

function safeJoin(base, userInput) {
    const targetPath = path.normalize(path.join(base, userInput));
    console.log(targetPath);
    if (targetPath.startsWith(base)) {
      return targetPath;
    }
    return null; // or throw an error, indicating an invalid path
}

module.exports = safeJoin;