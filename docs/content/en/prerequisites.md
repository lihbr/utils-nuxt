---
title: "Prerequisites"
menuTitle: "Prerequisites"
subtitle: ""
badge: ""
description: "lihbr utils for Nuxt.js"
position: 120
category: "Getting Started"
version: 0.1
fullscreen: false
---

Those packages are hosted on [GitHub npm Registry](https://github.com/features/packages). In order to install them, you will have to tell your node package manager to fetch them there. This can be achieved through a simple `.npmrc` file ([documentation](https://docs.npmjs.com/configuring-npm/npmrc.html)) that you can version at the root of your repository:

```apacheconf[.npmrc]
@lihbr:registry=https://npm.pkg.github.com
```

This line simply tells your package manager, either Yarn or npm, to fetch packages under `@lihbr` scope from GitHub's registry instead of npm's.
