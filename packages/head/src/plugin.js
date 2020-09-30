import Vue from "vue";

const TITLE_FORMAT = "<%= options.titleFormat %>";
const APP_NAME = "<%= options.name %>";
const APP_DESCRIPTION = "<%= options.description %>";
const APP_URL = "<%= options.url %>";

const TITLE_LIMIT = 50;
const DESCRIPTION_LIMIT = 155;
const __undefined = "__undefined";

/**
 * Cap a string to a given number of characters correctly
 * @param {String} string - string to work on
 * @param {Number} limit - max number of characters
 * @return {String} - capped string
 */
const limitLength = (string = "", limit = -1) => {
  let sanitizedString = string.trim();
  if (limit > 0 && sanitizedString.length > limit) {
    sanitizedString = sanitizedString.slice(0, limit);
    sanitizedString = sanitizedString.slice(
      0,
      sanitizedString.lastIndexOf(" ")
    );
    sanitizedString = `${sanitizedString}...`;
  }
  return sanitizedString;
};

/**
 * Check if string is undefined
 * @param {String} str - string to check
 * @return {Boolean} - true if equal to undefined constant
 */
const isUndefined = str => str === __undefined;

/**
 * Get page title according to title format
 * @param {String} pageTitle - page title
 */
const metaTitleTemplate = pageTitle => {
  if (!isUndefined(pageTitle) && pageTitle && pageTitle.trim()) {
    return TITLE_FORMAT.replace("%site%", APP_NAME).replace(
      "%page%",
      limitLength(pageTitle, TITLE_LIMIT)
    );
  } else {
    return APP_NAME;
  }
};

const metaDescriptionTemplate = pageDescription => {
  if (
    !isUndefined(pageDescription) &&
    pageDescription &&
    pageDescription.trim()
  ) {
    return limitLength(pageDescription, DESCRIPTION_LIMIT);
  } else {
    return APP_DESCRIPTION;
  }
};

Vue.prototype.$buildHead = ({
  title = __undefined,
  description = __undefined,
  metaImage = { og: undefined, tw: undefined },
  path,
  additionalStructuredData = []
} = {}) => {
  const itempropMeta = [
    {
      hid: "itemprop_name",
      itemprop: "name",
      content: title,
      template: metaTitleTemplate
    },
    {
      hid: "itemprop_description",
      itemprop: "description",
      content: description,
      template: metaDescriptionTemplate
    }
  ];

  const ogMeta = [
    {
      hid: "og:url",
      property: "og:url",
      content: path,
      template: path => {
        if (path) {
          return `${APP_URL}${path}`.replace(/\/$/, "");
        } else {
          return APP_URL;
        }
      }
    },
    {
      hid: "og:title",
      property: "og:title",
      content: title,
      template: metaTitleTemplate
    },
    {
      hid: "og:description",
      property: "og:description",
      content: description,
      template: metaDescriptionTemplate
    }
  ];

  if (metaImage.og) {
    itempropMeta.push({
      hid: "itemprop_image",
      itemprop: "image",
      content: metaImage.og
    });

    ogMeta.push({
      hid: "og:image",
      property: "og:image",
      content: metaImage.og
    });
  }

  const twitterMeta = [
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: title,
      template: metaTitleTemplate
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: description,
      template: metaDescriptionTemplate
    }
  ];

  if (metaImage.tw) {
    twitterMeta.push({
      hid: "twitter:image",
      name: "twitter:image",
      content: metaImage.tw
    });
  }

  return {
    title,
    titleTemplate: metaTitleTemplate,
    meta: [
      {
        hid: "description",
        name: "description",
        content: description,
        template: metaDescriptionTemplate
      },

      ...itempropMeta,
      ...ogMeta,
      ...twitterMeta
    ],
    script: [
      {
        hid: "structuredData",
        type: "application/ld+json",
        json: [
          {
            "@context": "http://schema.org",
            "@type": "WebSite",
            url: `${APP_URL}${path ? path : ""}`.replace(/\/$/, ""),
            name: title,
            alternateName: APP_NAME
          },
          ...additionalStructuredData
        ]
      }
    ]
  };
};
