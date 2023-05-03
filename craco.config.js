const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@styles": path.resolve(__dirname, "./src/styles/"),
            "@Lib": path.resolve(__dirname, "./src/lib/")
        }
    }
}
