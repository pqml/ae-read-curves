<h1 align="center">ae-read-curves</h1>
<h3 align="center">Read After Effects curves exported by <a href="https://github.com/pqml/ae-export-curves">ae-export-curves</a></h3>

<br><br><br>

## Example
Example on [https://pqml.github.io/ae-read-curves](https://pqml.github.io/ae-read-curves)

<br><br>

## Features
- Read curves exported by [ae-export-curves](https://github.com/pqml/ae-export-curves)
- Get property values at a precise time, with the `seek()` function
- Tiny module, < 1ko gziped

<br><br>

## Module Installation & Usage

##### Installation from npm
```sh
# using npm
$ npm install --save ae-read-curves

# or using yarn
$ yarn add ae-read-curves
```

##### Usage with a module bundler
```js
// using ES6 module
import readCurves from 'ae-read-curves'

// using CommonJS module
const readCurves = require('ae-read-curves')

const comp = readCurves(json)

console.log(comp.duration) // get duration of the composition
console.log(comp.width) // get width of the composition
console.log(comp.height) // get height of the composition

comp.seek(0.5) // go to the middle of the composition timeline
console.log(comp.values.translateX) // get translateX property value at 0.5 progress
```

##### Usage from a browser

```html
<script src="https://unpkg.com/ae-read-curves"></script>
<script>
  var comp = window.AEReadCurves(json)
  comp.seek(0.1)
  console.log(comp.values.translateX)
</script>
```

<br><br>

## Development commands

- `npm install` - Install all npm dependencies
- `npm run start` - Start the dev server with livereload on the example folder
- `npm run build` - Bundle your library in CJS / UMD / ESM
- `npm run deploy` - Deploy your example folder on a gh-page branch
- `npm run test` - Lint your js inside the src folder

<br><br>

## License
MIT.

