/**
 * Set head meta
 * @param {Object} options - module options object
 */
const meta = function (options) {
  const itempropMeta = [];

  const ogMeta = [
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: options.name
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website"
    }
  ];

  if (options.metaImage.og) {
    itempropMeta.push({
      hid: "itemprop_image",
      itemprop: "image",
      content: options.metaImage.og
    });

    ogMeta.push({
      hid: "og:image",
      property: "og:image",
      content: options.metaImage.og
    });
  }

  const twitterMeta = [
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image"
    }
  ];

  if (options.metaImage.tw) {
    twitterMeta.push({
      hid: "twitter:image",
      name: "twitter:image",
      content: options.metaImage.tw
    });
  }

  if (options.twitterHandle) {
    twitterMeta.push({
      hid: "twitter:site",
      name: "twitter:site",
      content: options.twitterHandle
    });
  }

  this.options.head.meta = this.options.head.meta || [];
  this.options.head.meta.push(
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },

    ...itempropMeta,
    ...ogMeta,
    ...twitterMeta,

    { name: "msapplication-TileColor", content: options.accentColor },
    { name: "theme-color", content: options.backgroundColor }
  );
};

module.exports = meta;
