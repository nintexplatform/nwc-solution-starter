# Add the web part to your page
- Retrieve your Nintex ClientID
- Add the web part to the page where you want to display a user's tasks and forms.
_Note:_ If the Nintex Solution Starter is not deployed to all sites, you will first need to add it to your site.


## Retrieve your Nintex ClientID
Your Nintex ClientID will be used in the configuration of the web part once it is installed. The ClientID is used to authenticate your SharePoint environment with Nintex Workflow Cloud, and enables your users to be able to access the web part with their Nintex Workflow Cloud credentials. If your users do not yet have access to your Nintex Workflow Cloud tenant, you can learn more about how to add them within the [Nintex Workflow Cloud product documentation](https://help.nintex.com/en-US/nwc/Content/Settings/UserManagement.htm).

To retrieve your Nintex ClientID
1. Complete the **[request form]** with your SharePoint information.
1. You will recieve an email with your new ClientID.

Your ClientID can be used in any web part installed in your environment. 

## Add NWC Tasks and Forms web part to your site
If your SharePoint Administrator has not deployed the Nintex Solution Starter for all sites, you must add the app to your site individually before you can use it on pages.

To add the app to your site:
1. Navigate to the Site Contents page of the site where you want to add the app.
1. Click **New** > **App**.
1. In the **Apps you can add** section, click **NWC Tasks and Forms**.
   
   If you do not see the _NWC Tasks and Forms_ app, contact your SharePoint Administrator.


## Add the web part to a page
1. Edit the page you want to add the web part to.
1. Click the **Add** plus button where you want to add the web part.
1. Select **NWC Tasks and Forms**.

   _Note:_ If the web part does not appear in the catalogue, see _Add NWC Tasks and Forms to your site_.  
   The web part displays sample data until it is configured.
1. Click the **Edit** button to configure the web part.
1. Type the name of your tenant into the **Tenant name** field.

   Your tenant name is the name that appears at the start of your Nintex Workflow Cloud URL.  
   Only type the tenant name, not the full URL.  
   For example, if your tenant URL is `acme.workflowcloud.com`, type `acme`.
1. Add your ClientID into the **ClientID** field.
   
   If you do not know ClientID, see _Retrieve your Nintex ClientID_
 
1. Click **Republish** to save and publish the page.
1. If you are not currently signed into Nintex Workflow Cloud, a popup requests you to sign in and authorize the connection.

   Once configured, the web part displays the user's forms and tasks.
