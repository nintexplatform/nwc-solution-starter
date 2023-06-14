# Troubleshooting ;

### Update Version

- If making any changes or edits to files, and then re-build, make sure to update the version number within file `package-solution.json`


### Package.json (file contents) - for SPFX 1.11 (SharePoint Online)
- When building the package for *just* SharePoint Online, use the details below as comparison to ensure that package.json is correct.
- Make sure to use Node v10 (10.23.3)
```
{
  "name": "nwc-tasks-forms",
  "version": "0.0.1",
  "private": true,
  "main": "lib/index.js",
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "build": "gulp bundle",
    "clean": "gulp clean",
    "test": "gulp test"
  },
  "dependencies": {
    "@auth0/auth0-spa-js": "^1.14.0",
    "@microsoft/rush-stack-compiler-3.2": "^0.12.0",
    "@microsoft/sp-core-library": "~1.11.0",
    "@microsoft/sp-lodash-subset": "~1.11.0",
    "@microsoft/sp-webpart-base": "~1.11.0",
    "@microsoft/sp-office-ui-fabric-core": "~1.4.0-0",
    "office-ui-fabric-react": "^2.31.0",
  },
  "devDependencies": {
    "@types/react": "0.14.46",
    "@types/react-dom": "0.14.18",
    "@types/react-addons-shallow-compare": "0.14.17",
    "@types/react-addons-update": "0.14.14",
    "@types/react-addons-test-utils": "0.14.15",
    "@microsoft/sp-build-web": "~1.11.0",
    "@microsoft/sp-module-interfaces": "~1.11.0",
    "@microsoft/sp-webpart-workbench": "~1.11.0",
    "gulp": "~3.9.1",
    "@types/chai": "3.4.34",
    "@types/mocha": "2.2.38",
    "ajv": "~5.2.2",
    "@types/webpack-env": "1.13.1",
    "@types/es6-promise": "0.0.33"
  }
}
```
