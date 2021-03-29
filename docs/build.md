# Build the package

There are two ways you can configure and deploy your package:

  - Support both SharePoint Online and SharePoint on-premises 
  - Support SharePoint Online only.
  
If you want to support both SharePoint Online and SharePoint on-premesis:
1. Configure your App Catalog location.
1. Build your package.
1. Install your package **and upload the additional supporting files**. See [Install your package](./install.md).

If you plan to only support SharePoint online:
1. Configure the package for SharePoint Online only.
1. Build your package.
1. Install your package. You will not need to upload additional files. See [Install your package](./install.md).

## Configure the App Catalog location

_Note:_ If you plan to configure your package for SharePoint Online only, you do not need to perform this step.

Before you build your file, check whether your SharePoint environment is using the default location for the App Catalog.

In your SharePoint environment:
1. Navigate to the App Catalog in your browser and examine the URL:

   If the address starts with `{your SharePoint domain}/sites/appcatalog/` then you are using the default location. You are ready to build your package.
1. If the address does not start with  `{your SharePoint domain}/sites/appcatalog/` then copy the part of the URL that comes after `/sites/`.

   For example, if the URL was`{your SharePoint domain}/sites/apps/{Rest of the URL}` you would copy **apps**.
1. In the project  you have downloaded from the repository, navigate to the **/config** folder.
1. Open the **write-manifest.json** file.
1. Find the line that starts with `"cdnBasePath"`.
1. Select the **appcatalogue** part of the value: "/sites/`appcatalog`/CDN/nwctasksforms".
1. Paste the URL-part you copied earlier.

   For example, if your App Catalogue location was **apps**:  

    ```javascript	
    {
      "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json",
      "cdnBasePath": "/sites/apps/CDN/nwctasksforms"`
    }
    ```
1. Save and close the file.


## Build your package
Once you have prepared your manifest file, you can build the package.

We recommend using a code editor that provides a console, such as [Visual Studio Code](https://code.visualstudio.com/), [Atom](https://atom.io/) or [Webstorm](https://www.jetbrains.com/webstorm).

_Note:_ If you are supporting SharePoint on-premesis, you must use Node v6. Use NODIST (or 'n' if developing on a Mac) to switch Node versions. Check [nodejs.org](https://nodejs.org/dist/latest-v6.x/) for the latest v6 version.

When debugging the package for the first time, you must first create and trust a developer certificate.
1. In the console, type the following commands, each command followed by the **Enter** key.
   1. `gulp trust-dev-cert`
   1. `set NODE_NO_HTTP2=1 && gulp serve`

You only need to run these commands once. 

To build your package:
1. In the console, type the following commands, each command followed by the **Enter** key.
   1. `gulp clean`
   1. `gulp build`
   1. `gulp bundle --ship`
   1. `gulp package-solution --ship`


## Configure your package for SharePoint Online only
If you are only using SharePoint online, you can configure the package to bundle all required files into one upload to make your installation process much simpler.

_Note:_ If you need to support both SharePoint Online and SharePoint on-premesis, you must use the standard build instructions.

To prepare your package for SharePoint online, you will:
  - Configure the package to use more recent frameworks,  libraries and Node version.
  - Retrieve the additional files that would normally be uploaded to a CDN.
  - Configure the package to combine all JSON and javascript files into the package rather than using a CDN.
  - Remove the CDN path from the configuration
  
Use the instructions below for a step-by-step walkthrough of preparing your package for SharePoint Online.

### Update frameworks and libraries
The package for SharePoint Online can make use of more recent versions of frameworks and libraries.
1. Open the **package.json** file in the top-level folder of the repository.
1. Find and update the following `@microsoft` values:

	```javascript
		"@microsoft/sp-core-library": "~1.12.0",
		"@microsoft/sp-lodash-subset": "~1.12.0",
		"@microsoft/sp-webpart-base": "~1.12.0",
	```
1. Find and update the following `react` values:

	```javascript	
		"react": "16.9.0",               
		"react-dom": "16.9.0"        
	```

### Switch your version of Node to v10
Using NVM or NODIST (or 'n' if you are developing on a Mac), switch to Node v10.

### Retrieve the content to be combined into the package
1. In the console, type the following commands, each command followed by the **Enter** key.
   1. `npm i`
   1. `npm i @microsoft/sp-tslint-rules`
   1. `npm i @microsoft/rush-stack-compiler-3.2`

### Configure the package to combine all JSON and javascript

1. Open the **package-solution.json** file in the **/config** folder of the repository.
1. Add the following line: `"includeClientSideAssets": true`.

   ```javascript  
	{
	  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json",
	  "solution": {
		"name": "Nintex Solution Starter - NWC Tasks and Forms",
		"id": "4cc1a9b3-bbe0-4db5-b97f-433c5562b052",
		"version": "1.0.0.17"
	  },
	  "paths": {
		"zippedPackage": "solution/nwc-tasks-forms.sppkg"
	  },
	  "includeClientSideAssets": true`
	}
	```

### Reset the CDN path
Because you have configured the package to contain all JSON and javascript, you can remove the CDN.

1. Open the **write-manifests.json** file in the **/config** folder of the repository.
1. Find the line that starts with `"cdnBasePath"`.
1. Change the value to `"<!-- PATH TO CDN -->"`.

    ```javascript	
    {
      "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json",
      "cdnBasePath": "<!-- PATH TO CDN -->"`
    }
    ```



