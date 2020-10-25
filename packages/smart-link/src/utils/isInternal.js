/**
 * Finds out whether or not link should be external
 * @param {Boolean} external - force an external link
 * @param {Boolean} internal - force an internal link
 * @param {Boolean} href - string to test for an external link
 * @return {Boolean} - true if external
 */
const isInternal = ({ external, internal, href }) => {
  if (external && internal) {
    /* eslint-disable-next-line prettier/prettier */
    console.warn("props \"external\" and \"internal\" are both true and conflicting with each other, giving priority to \"external\"");
    return false;
  }

  if (external) {
    return false;
  }

  if (internal) {
    return true;
  }

  const regex = /^\/(?!\/|assets).*$/gm; // match internal links
  return regex.test(href);
};

module.exports = isInternal;
