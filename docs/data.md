# Data models

Use the following data models to add new columns to your tasks and forms lists. You can find the files for these data models in **/src/models/**.

For more information on adding new columns, see [Add and remove columns](./columsAddRemove.md).

For more information on where to find the column definitions and where to cuztomize your columns, see [Customizing your columns](./customize.md).

_Note:_ These data models are based on the repository code's inbuilt calls to the [Nintex Workflow Cloud API](https://developer.nintex.com).
You can retrieve more or different data by customizing these calls or creating your own.

## Tasks
|Field name | Data type | Description|
|-----------|-----------|------------|
|actionInstanceId | string|Unique identifier of the action instance that triggered the task.|
|assignTo | string|Email address of the user the task is assigned to.|
|assignees | string[]|Array of the task assignees.|
|created | string|Date the task was created, in UTC.|
|description | string|Description of the task.|
|dueDate | string|Date the task is due to be completed, in UTC.|
|id| string|Unique identifier of the task.|
|message | string|Email body of the task.|
|name | string|Name of the task.|
|outcomes | string[]|An array of the possible outcomes of the task.|
|status | string|Current task status. May be one of: `active`, `expired`, `complete`, `overridden`, or `terminated`.|
|subject | string|Subject line of the task email.|
|workflow | string|Name of the workflow that initiated the task.|
|workflowId | string|Unique identifier of the workflow that initiated the task.|
|workflowInstanceId | string|Unique identifier of the workflow instance that initiated the task.|
|urls | _INintexUrls_|An object containing the URL to the form the task relates to. See below.|

## Forms
|Field name | Data type | Description|
|-----------|-----------|------------|
|id| string| Unique identifier of the form.|
|name | string| Name of the form.|
|description | string| Description of the form. |
|urls | _INintexUrls_| An object containing the URL to the form. See below.|
|favourite | boolean| Whether the form has been favourited by this user.|
|workflow  | _INintexWorkflow_| An object containing the name of the workflow the form triggers. See below.|

## INintexWorkflow
|Field name | Data type | Description|
|-----------|-----------|------------|
|name | string| The name of the workflow.|

## INintexUrls
|Field name | Data type | Description|
|-----------|-----------|------------|
|formUrl | string| The URL of the form to submit.|