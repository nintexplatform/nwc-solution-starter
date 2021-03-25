# Add the web part to your page

Add the web part to the page where you want to display a user's tasks and forms.

_Note:_ If the Nintex Tasks and Forms app is not deployed to all sites, you will first need to add it to your site.

## Add Nintex Tasks and Forms to your site
If your SharePoint Administrator has not deployed the Nintex Tasks and Forms app for all sites, you must add the app to your site individually before you can use it on pages.

To add the app to your site:
1. Navigate to the Site Contents page of the site where you want to add the app.
1. Click **New** > **App**.
1. In the **Apps you can add** section, click the Nintex Tasks and Forms app.
   
   If you do not see the Nintex Tasks and Forms app, contact your SharePoint Administrator.


## Add the web part to a page
1. Edit the page you want to add the web part to.
1. Click the **Add** plus button where you want to add the web part.
1. Select **Nintex Forms and Tasks**.

   _Note:_ If the web part does not appear in the catalogue, see _Add Nintex Tasks and Forms to your site_.  
   The web part displays sample data until it is configured.
1. Click the **Edit** button to configure the web part.
1. Type the name of your tenant into the **Tenant name** field.

   Your tenant name is the name that appears at the start of your Nintex Workflow Cloud URL.  
   Only type the tenant name, not the full URL.  
   For example, if your tenant URL is `acme.workflowcloud.com`, type `acme`.
1. Click **Republish**.
1. If you are not currently signed into Nintex Workflow Cloud, a popup requests you to sign in and authorize the connection.

   Once configured, the web part displays the user's forms and tasks.