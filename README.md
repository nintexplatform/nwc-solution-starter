# nwc-tasks-forms

## Development ;

##### DEBUG environment - for SPFX 1.1, to support SP2016, SP2019 and SPO ;
- Node must be 6.x
- Use 'nodist' to switch node versions on Windows, use the 'n' command when working with node on a Mac

Example:
```
$ npm install -g n
$ n 6.17.1
```
- Check here for latest version :  https://nodejs.org/dist/latest-v6.x/
- This is to support SP2016 compatability - and SPFX 1.1

##### Run in debug console ;
```
gulp trust-dev-cert
set NODE_NO_HTTP2=1 && gulp serve
```

##### Build + package ;
```
gulp clean
gulp build
gulp bundle --ship
gulp package-solution --ship
```


## Deployment - existing codebase - to support SP2016, SP2019, SPO ;

##### Upload SPPKG to AppCatalog
- Packaged file after build+package - located in /sharepoint/solution
- Update SPPKG file to AppCatalog site, within 'Apps for SharePoint'

##### Need to make a [Document Library] within AppCatalog ;
- /sites/appcatalog/CDN

##### Within this library, create a folder "nwctasksforms" ;
- Upload all files from the folder : /temp/deploy
- This is typically 1 JSON, 3 JS files
- NOT from /dist
- This is to allow for cross-support with SP2016.

## Add to Site ;

##### Add An App
- Within a site collection, choose "Add An App"
- WebPart will now be available in the gallery
- Add the WebPart to a [modern] page - and update the properties/settings



## Update SPFX for SPOnline - for deployment of single SPPKG - to SPO only (OPTIONAL) ;

- If you are using SharePoint Online (only), then you can update to the newest/latest SPFX
- Also, this allows for a single file SPPKG to deploy

##### Node version

- Use NVM or NODIST to use Node v10 (currently 10.24.0)
- This will be ‘n’ if using a Mac computer

##### Update version references

- Within file package.json
- Change the references for SPFX to the latest version (these were set at 1.1.0 - change to 1.11.0)
```
"@microsoft/sp-core-library": "~1.11.0",
"@microsoft/sp-lodash-subset": "~1.11.0",
"@microsoft/sp-webpart-base": "~1.11.0",
```
- Update these packages within console ;
```
npm i @microsoft/rush-stack-compiler-3.2
```

##### Get full packages
```
npm i
npm audit fix
```

##### Update the package to include all JS and JSON

- Within file package-solution.json
- Add the entry ;
```
"includeClientSideAssets": true
```

##### Reset CDN path

- Within file write-manifests.json
```
"cdnBasePath": "<!-- PATH TO CDN -->"
```

##### Rebuild / Re-package

```
gulp clean
gulp build
gulp bundle --ship
gulp package-solution --ship
```
##### Upload SPPKG to AppCatalog
- Packaged file after build+package - located in /sharepoint/solution
- Update SPPKG file to AppCatalog site, within 'Apps for SharePoint'
- No need for other CDN files/folders, etc

## Troubleshooting ;

##### Update Version

- If making any changes or edits to files, and then re-build, make sure to update the version number
- Within file package-solution.json

##### Package.json (file contents) - for SPFX 1.11 (SharePoint Online)

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
    "@microsoft/sp-core-library": "~1.1.0",
    "@microsoft/sp-lodash-subset": "~1.1.0",
    "@microsoft/sp-office-ui-fabric-core": "~1.4.0-0",
    "@microsoft/sp-webpart-base": "~1.1.0",
    "office-ui-fabric-react": "^2.31.0",
    "react": "15.4.2",
    "react-dom": "15.4.2"
  },
  "devDependencies": {
    "@types/react": "0.14.46",
    "@types/react-dom": "0.14.18",
    "@types/react-addons-shallow-compare": "0.14.17",
    "@types/react-addons-update": "0.14.14",
    "@types/react-addons-test-utils": "0.14.15",
    "@microsoft/sp-build-web": "~1.1.0",
    "@microsoft/sp-module-interfaces": "~1.1.0",
    "@microsoft/sp-webpart-workbench": "~1.1.0",
    "gulp": "~3.9.1",
    "@types/chai": "3.4.34",
    "@types/mocha": "2.2.38",
    "ajv": "~5.2.2",
    "@types/webpack-env": "1.13.1",
    "@types/es6-promise": "0.0.33"
  }
}
```