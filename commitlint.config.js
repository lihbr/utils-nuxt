module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["env", "head", "payload", "smart-link", "statistics", "release", "config", "deps", "misc"]
    ],
    "scope-empty": [2, "never"]
  }
};
