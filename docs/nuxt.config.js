import path from "path";
import { withDocus } from "docus";

export default withDocus({
  css: [
    path.join(__dirname, "/assets/css/main.css"),
    path.join(__dirname, "/assets/css/prism.css")
  ],
  generate: {
    fallback: true
  },
  buildModules: [
    [
      "nuxt-ackee",
      {
        server: process.env.ACKEE_ENDPOINT,
        domainId: process.env.ACKEE_ID,
        ignoreLocalhost: true,
        detailed: true
      }
    ]
  ]
});
