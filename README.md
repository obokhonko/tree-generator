### Recursive tree renderer + breadcrumbs generator

Main stack of a project is based on https://github.com/obokhonko/ui-seed.
Application fetches data from an external API resource https://designer.mocky.io/

No specific libraries used to generate breadcrumbs or tree view. It is a fully custom implementation.
Therefore, it is not optimal and misses some features.

Main functionality is build around 2 components:

* `<DirectorTree />`
* `<Breadcrumbs />`

### What needs to be improved?

1. Optimize tree renderer 
2. Open/collapse tree node feature is not complete. Current implementation meets a dead end. Different mechanism 
should be created to track open/close state thus there has to be changes in a data preparation phase before 
passing it to rendering
3. Sync breadcrumbs and node tree selection with a router.
4. Add unit tests
5. State manager (native or 3rd party)

### Building

* `npm install` - install packages
* `npm run build:dev` - development build
* `npm run build` - production build 

Build results will be placed to `dist` folder.

### Testing

* `npm run test`, or `npm run test:watch`
* `npm run coverage` for coverage report
* `npm start` and `npm run test:e2e` in other terminal for E2E

### Start

To starts the application run `npm start` for a dev-server on http://localhost:3030
