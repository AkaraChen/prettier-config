# prettier-config-akrc

## Table of Contents

- [prettier-config-akrc](#prettier-config-akrc)
  - [Table of Contents](#table-of-contents)
  - [About ](#about-)
  - [Getting Started ](#getting-started-)
    - [Install](#install)
    - [Usage ](#usage-)

## About <a name = "about"></a>

Just my prettier config.

## Getting Started <a name = "getting_started"></a>

### Install

You need to install prettier to use this config.

```shell
pnpm add prettier @akrc/prettier-config -D
```
### Usage <a name = "usage"></a>

Create a `.prettierrc`, and fill in:

```js
"prettier-config-akrc"
```

If you want to override some config, you need a `.prettierrc.js`:

```js
module.exports = {
  ...require("prettier-config-akrc"),
  semi: false,
};
```
