# eslint-plugin-classname-cn

ESLint plugin that enforces using the `cn()` utility from shadcn/ui style setups for dynamic `className` values in JSX.

## Why

This rule helps keep class composition consistent by preventing ad-hoc conditional patterns in `className`, such as:

- ternary expressions
- logical expressions
- template literals with interpolations

## Installation

```bash
npm i -D eslint-plugin-classname-cn
```

## Usage

### Flat config (`eslint.config.js`)

```js
import classnameCn from "eslint-plugin-classname-cn";

export default [
  ...classnameCn.configs["flat/recommended"]
];
```

### Legacy config (`.eslintrc.cjs`)

```js
module.exports = {
  plugins: ["classname-cn"],
  extends: ["plugin:classname-cn/recommended"]
};
```

### Manual rule setup

```js
module.exports = {
  plugins: ["classname-cn"],
  rules: {
    "classname-cn/use-cn-for-classname": "error"
  }
};
```

## Rule

### `classname-cn/use-cn-for-classname`

Disallows these dynamic patterns in `className`:

- `<div className={isOpen ? "open" : "closed"} />`
- `<div className={isOpen && "open"} />`
- `<div className={`btn ${variant}`} />`

Use your shadcn-style `cn(...)` helper instead.

## Development

```bash
npm run build
npm run test
```
