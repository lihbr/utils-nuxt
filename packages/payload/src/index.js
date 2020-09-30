const path = require("path");
const defaultsDeep = require("lodash/defaultsDeep");

const logger = require("./logger");

module.exports = async function (moduleOptions) {
  /**
   * Options
   */
  const options = defaultsDeep(moduleOptions, {
    payloadBaseRoute: "/payload"
  });

  /**
   * Checks
   */
  if (!this.options.generate) {
    return logger.fatal(
      /* eslint-disable-next-line prettier/prettier */
      "\"generate\" object is not defined in \"nuxt.config.js\", disabling module"
    );
  } else if (!this.options.generate.routes) {
    return logger.fatal(
      /* eslint-disable-next-line prettier/prettier */
      "\"generate.routes\" array is not defined in \"nuxt.config.js\", disabling module"
    );
  }

  if (!this.options.generate.fallback) {
    logger.warn(
      /* eslint-disable-next-line prettier/prettier */
      "\"generate.fallback\" should most likely be set to \"true\" for production"
    );
  }

  /**
   * Config
   */
  const posixPayloadBaseRoute = path.posix.join("/", options.payloadBaseRoute);

  /**
   * Plugin
   */
  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    fileName: "pagePayload.js",
    options: {
      base: posixPayloadBaseRoute,
      dev: this.options.dev
    }
  });

  /**
   * Hooks
   */

  // Mock payload in developement
  if (this.options.dev) {
    this.addServerMiddleware({
      path: posixPayloadBaseRoute,
      handler: (req, res) => {
        // Find route path
        let path = req.originalUrl
          .replace(new RegExp(`^${posixPayloadBaseRoute}`), "")
          .replace(/\/+$/, "");
        if (!path.startsWith("/")) {
          path = `/${path}`;
        }

        // Set body
        let body = {};
        const maybeRoute = this.options.generate.routes.find(
          route => route.route === path
        );
        if (typeof maybeRoute === "object" && maybeRoute.payload) {
          res.statusCode = 200;
          body = {
            status: 200,
            msg: "ok",
            data: maybeRoute.payload
          };
        } else {
          logger.error(
            `Payload not found for path: \"${path}\", this will cause throw a 404 in production!`
          );
          res.statusCode = 404;
          body = {
            status: 404,
            msg: "not found",
            error: {}
          };
        }

        // Send response
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(body));
      }
    });
  }

  logger.success("Payload module initialized");
};
