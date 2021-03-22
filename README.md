# nwc-tasks-forms

## Summary

DEBUG environment ;
* Node must be 6.x
* Use 'nodist' to switch node versions
* Check here for latest version :  https://nodejs.org/dist/latest-v6.x/
* This is to support SP2016 compatability - and SPFX 1.1

Run in debug console ;
* gulp trust-dev-cert
* set NODE_NO_HTTP2=1 && gulp serve

Build + package ;
* gulp clean
* gulp build
* gulp bundle --ship
* gulp package-solution --ship



Deployment ;

Need to make a Document Library within AppCatalog ;
* /sites/appcatalog/CDN

Within this library, create a folder "nwctasksforms" ;
* Deploy the JS files from /dist

This is to allow for cross-support with SP2016.

If *only* using SharePoint Online ;
* Update the version within 'PACKAGE-SOLUTION.JSON' from 1.1.0.0 to latest (v.1.8.0.0)
* Add entry to PACKAGE-SOLUTION.JSON ;
   "includeClientSideAssets": true,
