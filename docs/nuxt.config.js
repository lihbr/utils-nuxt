import path from "path";
import theme from "@nuxt/content-theme-docs";

export default theme({
  loading: {
    color: "#e84311"
  },
  content: {
    markdown: {
      prism: {
        theme: path.join(__dirname, "/assets/css/prism.css")
      }
    }
  }
});
