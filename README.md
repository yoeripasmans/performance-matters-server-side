# OBA application server-side

Overview of the 50 most popular buildings of Amsterdam rendered serverside.

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

## Performance

- Minified CSS with

- Compress all responses on the server with:
```javascript
app.use(compression());
```

## License

MIT © Yoeri Pasmans
