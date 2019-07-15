# babel-plugin-transform-jsx-fragment



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-transform-jsx-fragment
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-jsx-fragment"]
}
```

### Via CLI

```sh
$ babel --plugins transform-jsx-fragment script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-jsx-fragment"]
});
```
