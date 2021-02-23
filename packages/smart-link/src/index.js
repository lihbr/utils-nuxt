/* HEALTH:HIGH smart-link */
const { mergeData } = require("vue-functional-data-merge/dist/lib.common.js");

const { getLinkTag } = require("./utils");

const SPAN_TAG = "span";
const ANCHOR_TAG = "a";
const FRAMEWORK_LINK = "nuxt-link"; // or "nuxt-link", "g-link"...

const ANCHOR_REL_ATTRIBUTE = "noopener";

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
  render(h, context) {
    // Resolve link tag
    const tag = getLinkTag(context.props, {
      SPAN_TAG,
      ANCHOR_TAG,
      FRAMEWORK_LINK
    });

    // Create new data object
    const data = {
      class: "smartLink"
    };
    switch (tag) {
      case ANCHOR_TAG:
        // Map `href` prop to the correct attribute
        data.attrs = {
          href: context.props.href
        };

        // Handle `blank` prop
        if (context.props.blank) {
          data.attrs.target = "_blank";
          data.attrs.rel = ANCHOR_REL_ATTRIBUTE;
        }

        // Transform native events to regular events for HTML anchor tag
        data.on = { ...context.data.nativeOn };
        delete context.data.nativeOn;
        break;

      case FRAMEWORK_LINK:
        // Map `href` prop to the correct prop
        data.props = {
          to: context.props.href
        };
        break;

      default:
        break;
    }

    return h(tag, mergeData(context.data, data), context.slots().default);
  }
};

module.exports = SmartLink;
