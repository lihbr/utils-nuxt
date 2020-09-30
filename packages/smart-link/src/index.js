/* HEALTH:HIGH smart-link */
const { mergeData } = require("vue-functional-data-merge/dist/lib.common.js");

const { isInternal } = require("./utils");

const FRAMEWORK_LINK = "nuxt-link";

const SmartLink = {
  name: "SmartLink",
  functional: true,
  props: {
    href: {
      type: String,
      default: ""
    },
    blank: {
      type: Boolean,
      default: false
    },
    external: {
      type: Boolean,
      default: false
    },
    internal: {
      type: Boolean,
      default: false
    }
  },
  render(createElement, { props, data, slots }) {
    // Resolve html tag
    let htmlTag = "span";
    if (props.href) {
      if (isInternal(props) && !props.blank) {
        htmlTag = FRAMEWORK_LINK;
      } else {
        htmlTag = "a";
      }
    }

    // Forward event listeners if not an internal link
    let on = {};
    if (htmlTag !== FRAMEWORK_LINK) {
      on = { ...data.nativeOn };
      delete data.nativeOn;
    }

    // Apply right attributes depending on final link type
    const attrs = {};
    switch (htmlTag) {
      case FRAMEWORK_LINK:
        attrs.to = props.href;
        break;

      case "a":
        attrs.href = props.href;
        if (props.blank) {
          attrs.target = "_blank";
          attrs.rel = "noopener";
        }
        break;

      default:
        break;
    }

    return createElement(
      htmlTag,
      mergeData(data, { class: "smartLink", attrs, on }),
      slots().default
    );
  }
};

module.exports = SmartLink;
