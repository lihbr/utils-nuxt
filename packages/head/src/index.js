const path = require("path");
const defaultsDeep = require("lodash/defaultsDeep");

const setGlobal = require("./setGlobal");

const logger = require("./logger");

module.exports = function (moduleOptions) {
  /**
   * Options
   */
  const options = defaultsDeep(moduleOptions, {
    lang: "en",
    name: "",
    description: "",
    metaImage: {
      og: undefined,
      tw: undefined
    },
    twitterHandle: undefined,
    backgroundColor: "#fefefe",
    accentColor: "#111111",
    titleFormat: "%page% - %site%",
    url: undefined
  });

  // Sanitize twitter handle if provided
  if (options.twitterHandle && !options.twitterHandle.startsWith("@")) {
    options.twitterHandle = `@${options.twitterHandle}`;
  }

  /**
   * Checks
   */
  if (typeof this.options.head === "function") {
    return logger.fatal(
      /* eslint-disable-next-line prettier/prettier */
      "\"head\" is provided as a function which is not supported by head module, disabling module"
    );
  }

  const mandatoryOptionsKeys = ["name", "description", "url"];
  for (const key of mandatoryOptionsKeys) {
    if (!options[key]) {
      return logger.fatal(
        /* eslint-disable-next-line prettier/prettier */
        `"options.${key}" is required for head module to work, disabling module`
      );
    }
  }

  /**
   * Global
   */

  // Main
  setGlobal.main.call(this, options);
  // Meta
  setGlobal.meta.call(this, options);
  // Link
  setGlobal.link.call(this, options);

  /**
   * Plugin
   */
  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    fileName: "buildHead.js",
    options
  });

  logger.success("Head module initialized");
};
