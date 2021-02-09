require("dotenv").config();

import path from "path";
import { withDocus } from "docus";

export default withDocus({
  loading: {
    color: "#e84311"
  },
  css: [
    path.join(__dirname, "/assets/css/main.css"),
    path.join(__dirname, "/assets/css/prism.css")
  ],
  buildModules: [
    ["@nuxtjs/netlify-files", { existingFilesDirectory: __dirname }]
  ],
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
