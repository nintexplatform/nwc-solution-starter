# nwc-tasks-forms

## Summary



Deployment ;

Need to make a Document Library within AppCatalog ;
* /sites/appcatalog/CDN

Within this library, create a folder "nwctasksforms" ;
* Deploy the JS files from /dist

This is to allow for cross-support with SP2016.

=========================================================
If *only* using SharePoint Online ;
=========================================================
* Update the version within 'PACKAGE-SOLUTION.JSON' from 1.1.0.0 to latest (v.1.8.0.0)
* Add entry to PACKAGE-SOLUTION.JSON ;

   "includeClientSideAssets": true,


