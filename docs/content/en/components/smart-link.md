---
title: "smart-link"
menuTitle: "smart-link"
subtitle: ""
badge: ""
description: "lihbr utils for Nuxt.js"
position: 310
category: "Components"
version: 0.1
fullscreen: false
features:
  - "Automatically use the right link tag or component according to provided href"
---

`@lihbr/utils-nuxt.smart-link` provides a generic link component to stop choosing between anchor tag or nuxt-link.

## Features

<list :items="features"></list>

## Installation

<alert type="info">

Make sure you checked [prerequisites](/prerequisites) before proceeding to installation~

</alert>

Add `@lihbr/utils-nuxt.smart-link` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @lihbr/utils-nuxt.smart-link
```

  </code-block>
  <code-block label="npm">

```bash
npm install @lihbr/utils-nuxt.smart-link
```

  </code-block>
</code-group>

## Usage

Import `@lihbr/utils-nuxt.smart-link` into your components:

```vue[~/components/display/Card.vue]
<script>
import SmartLink from "@lihbr/utils-nuxt.smart-link";

export default {
  components: {
    SmartLink
  }
};
</script>
```

Or register it globally through a Nuxt.js plugin (do not forget to register the plugin inside your `nuxt.config.js` file):

```javascript[~/plugins/smart-link.js]
import Vue from "vue";
import SmartLink from "@lihbr/utils-nuxt.smart-link";

Vue.component("smart-link", SmartLink);
```

You can now use it in your Vue.js templates:

<!-- prettier-ignore-start -->
```vue[~/components/display/Card.vue]
<template>
  <!-- Will use an anchor tag -->
  <smart-link href="https://example.com"><!-- ... --></smart-link>

  <!-- Will use Nuxt.js link component -->
  <smart-link href="/about"><!-- ... --></smart-link>

  <!-- Will use an anchor tag and open in a new page -->
  <smart-link href="/references" blank><!-- ... --></smart-link>

  <!-- Force an anchor tag usage -->
  <smart-link href="/media/nuxt3-release-date.pdf" external><!-- ... --></smart-link>

  <!-- Will use an anchor tag -->
  <smart-link href="mailto:hello@lihbr.com"><!-- ... --></smart-link>
</template>
```
<!-- prettier-ignore-end -->

## Reference

### Props

#### href

- Type: `String`
- Default: `""`

Link href.

<!-- prettier-ignore-start -->
```html[component options]
<smart-link href="https://example.com"><!-- ... --></smart-link>
```
<!-- prettier-ignore-end -->

#### blank

- Type: `Boolean`
- Default: `false`

Opens link in a new page, even if internal.

<!-- prettier-ignore-start -->
```html[component options]
<smart-link blank><!-- ... --></smart-link>
```
<!-- prettier-ignore-end -->

#### external

- Type: `Boolean`
- Default: `false`

Force link to be considered as an external link using anchor tag.

<!-- prettier-ignore-start -->
```html[component options]
<smart-link external><!-- ... --></smart-link>
```
<!-- prettier-ignore-end -->

#### internal

- Type: `Boolean`
- Default: `false`

Force link to be considered as an internal link using Nuxt.js link component.

<!-- prettier-ignore-start -->
```html[component options]
<smart-link internal><!-- ... --></smart-link>
```
<!-- prettier-ignore-end -->

### Props Defaults

<!-- prettier-ignore-start -->
```javascript[component props]
{
  href: "",
  blank: false,
  external: false,
  internal: false
}
```
<!-- prettier-ignore-end -->
