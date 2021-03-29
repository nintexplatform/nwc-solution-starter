# Install the web part in your environment
To install the web part in your SharePoint environment, add the app to your SharePoint App Catalogue and upload the CDN files.

_Note:_ To complete the installation, you must have SharePoint Admin Centre privileges.

## Step 1: Download or build the package
Before you can install the app, you must first either:
   - Download the ready-made package from the [nwc-solution-starter repository](https://github.com/nintexplatform/nwc-solution-starter).
   - [Build](./build.md) your cusomized package and find it in the **/sharepoint/solution** folder.

## Step 2: Install the package in SharePoint
In your SharePoint environment:
1. Navigate into the **App Catalog** of the SharePoint Admin Centre.
1. Click **Apps for SharePoint**.
1. Click the **Files** tab.
1. Click **Upload Document**.
1. Select the package you have downloaded or built to upload.
1. If you want all sites in your organization to be able to immediately access the app, select **Make this solution available to all sites**.

   Deploying to all sites allows SharePoint users to add the app directly to pages as a web part.  
   If you do not deploy to all sites, SharePoint Site Administrators must add the app to their sites individually in order to add it to site pages.
1. Click **Deploy**.

## Step 3: Upload the CDN files

_Note:_ If you are using SharePoint Online only, and you have configured your package for SharePoint Online using the [provided instructions](./build.md), you do not need to follow this step. Your deployment is complete.

In your SharePoint environment:
1. In your App Catalog, create a **Document Library** called **CDN**.
1. Inside this library, create a folder called **nwctasksforms**.
1. In the solution project folder where you built the package, navigate to **/temp/deploy**.
1. Upload the files in the **/temp/deploy** folder to the **nwctasksforms** folder.
