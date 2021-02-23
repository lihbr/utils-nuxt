/**
 * Figure out the right link tag/component to use
 * @param {Boolean} href - string to test for an external link
 * @param {Boolean} blank - if link has a blank target
 * @param {Boolean} external - force an external link
 * @param {Boolean} internal - force an internal link
 *
 * @param {Boolean} SPAN_TAG - span tag
 * @param {Boolean} ANCHOR_TAG - anchor tag
 * @param {Boolean} FRAMEWORK_LINK - framework link component
 *
 * @return {String} - found tag/component
 */
const getLinkTag = (
  { href, blank, external, internal },
  { SPAN_TAG = "span", ANCHOR_TAG = "a", FRAMEWORK_LINK = "router-link" }
) => {
  // span when no href
  if (!href) {
    return SPAN_TAG;
  }

  // defaults to anchor on conflict
  if (external && internal) {
    /* eslint-disable-next-line prettier/prettier */
    console.warn(
      'props "external" and "internal" are both true and conflicting with each other, giving priority to "external"'
    );
    return ANCHOR_TAG;
  }

  // anchor if blank or external
  if (blank || external) {
    return ANCHOR_TAG;
  }

  // framework link if internal
  if (internal || /^\/(?!\/).*$/.test(href)) {
    return FRAMEWORK_LINK;
  }

  // anchor is external
  return ANCHOR_TAG;
};

module.exports = getLinkTag;
