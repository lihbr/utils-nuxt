const defaultsDeep = require("lodash.defaultsDeep");

const logger = require("./logger");

const statisticsFunctions = {
  generate() {
    let startTime;
    let count;
    this.nuxt.hook("generate:routeCreated", () => {
      if (!startTime) {
        startTime = Date.now();
        count = 0;
      } else {
        count++;
      }
    });
    this.nuxt.hook("generate:done", () => {
      const time = (Date.now() - startTime) / 1000;
      const rps = count / time;
      logger.info(`Generated ${count} routes in ${time} sec (${rps} r/s)`);
    });
  }
};

module.exports = function (moduleOptions) {
  const options = defaultsDeep(moduleOptions, {
    ignore: []
  });

  // Run each non-ignored statistics functions
  for (const key in statisticsFunctions) {
    if (!options.ignore.includes(key)) {
      statisticsFunctions[key].call(this);
    }
  }

  logger.success("Statistics module initialized");
};
