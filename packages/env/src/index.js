const get = require("lodash.get");

const { firstTrue } = require("./utils");

/**
 * Configure app shared env variables
 * @param {Object} pkg - package.json content
 * @param {Object} settings - settings from datalayer // TODO: Normalize settings
 * @param {Object} GLOBAL_CONTENT - global content to load, just gets forwarded to the returned value
 * @return {Object} - built env object
 */
const configure = (pkg = {}, settings = {}, GLOBAL_CONTENT) => {
  // TRUE if in development mode
  const DEV = process.env.NODE_ENV === "development";
  // Commit reference env variable
  const COMMIT_REF = firstTrue(process.env.COMMIT_REF, "unknown");
  // Repository url env variable
  const REPOSITORY_URL = firstTrue(process.env.REPOSITORY_URL, "unknown");

  /**
   * Meta
   */

  // Application name
  const APP_NAME = firstTrue(
    settings.site_title,
    process.env.APP_NAME,
    pkg.name
  );
  // Application name
  const APP_TITLE_FORMAT = firstTrue(
    settings.title_format,
    process.env.APP_TITLE_FORMAT,
    "%page% - %site%"
  );
  // Application description
  const APP_DESC = firstTrue(
    settings.site_description,
    process.env.APP_DESC,
    pkg.description
  );
  // Open graph default image
  const APP_METAIMG_OG = firstTrue(
    get(settings, "site_image.url"),
    process.env.APP_METAIMG_OG,
    ""
  );
  // Twitter default image
  const APP_METAIMG_TW = firstTrue(
    get(settings, "site_image.twitter_variant.url"),
    process.env.APP_METAIMG_TW,
    ""
  );
  // Application linked twitter handle (without @)
  const APP_TWITTER_HANDLE = firstTrue(
    settings.site_twitter_handle,
    process.env.APP_TWITTER_HANDLE,
    ""
  );
  // Application background color
  const APP_BACKGROUND_COLOR = firstTrue(
    settings.site_background_color,
    process.env.APP_BACKGROUND_COLOR,
    "#fefefe"
  );
  // Application accent color
  const APP_ACCENT_COLOR = firstTrue(
    settings.site_accent_color,
    process.env.APP_ACCENT_COLOR,
    "#111111"
  );

  /**
   * Usage
   */

  // Application host
  const APP_HOST = firstTrue(process.env.APP_HOST, "localhost");
  // Application port
  const APP_PORT = firstTrue(process.env.APP_PORT, 3000);
  // Application url
  const APP_URL = (() => {
    if (DEV) {
      return `http://${APP_HOST}:${APP_PORT}`;
    } else {
      if (process.env.APP_URL) {
        return process.env.APP_URL;
      } else {
        /* eslint-disable-next-line prettier/prettier */
        throw new Error(
          '`process.env.APP_URL` should be defined when `NODE_ENV !== "development"`!'
        );
      }
    }
  })();
  // Application main language
  const APP_LANG = firstTrue(
    settings.site_language,
    process.env.APP_LANG,
    "en"
  );

  return {
    DEV,
    COMMIT_REF,
    REPOSITORY_URL,

    APP_NAME,
    APP_TITLE_FORMAT,
    APP_DESC,
    APP_METAIMG_OG,
    APP_METAIMG_TW,
    APP_TWITTER_HANDLE,
    APP_BACKGROUND_COLOR,
    APP_ACCENT_COLOR,

    APP_HOST,
    APP_PORT,
    APP_URL,
    APP_LANG,

    GLOBAL_CONTENT
  };
};

module.exports = configure;
