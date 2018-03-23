# OBA application server-side

This project serves a serverside version of the OBA - Overview of the 50 most popular buildings of Amsterdam.

## Getting started

1.  Clone the repo `git clone`
2.  Install dependencies `npm install` and `npm run build` to build everything.
3.  Run `npm start` to start server on port 3000.

## Build

1.  NPM installed `browserify` to bundle all `js` modules.
2.  Added
```javascript
"build:js": "browserify src/js/index.js -o public/bundle.js",
```
to `package.json` to bundle all of my commonJS requires clientside.
3.  NPM installed `node-sass`.
4.  Added
```javascript
"build:scss-compile": "node-sass  src/scss/ -o src/css/"
```
to `package.json` to compile scss to css.
5.  NPM installed `postcss`.
6.  Added postcss object to `package.json` with
```javascript
     "postcss": {
            "plugins": {
                "cssnano": {
                    "preset": "default"
                }
            }
        }
```
7. NPM installed `uglify-js-es6`
8. Added javascript minify to `package.json` with:
```javascript
    "build:js": "browserify src/js/index.js | uglifyjs -c > public/bundle.js",
```

## Performance

- Minified CSS with postCSS and CSSNano by adding to `package.json`:
```javascript
"postcss": {
	   "plugins": {
		   "cssnano": {
			   "preset": "default"
		   }
	   }
   }
```

- Minified JS with uglifyjs by adding to `package.json`:
```javascript
"build:js": "browserify src/js/index.js | uglifyjs -c > public/bundle.js",
```

- Compress all responses on the server by adding this to `app.js`:
```javascript
app.use(compression());
```

- Removed `FontAwesome` and used svg's as icons

## Audits
### Latest build:
![Preview](latestaudit.png)

## License

MIT © Yoeri Pasmans
