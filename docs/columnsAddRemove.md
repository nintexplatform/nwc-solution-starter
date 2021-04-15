# Add or remove columns

You can add or remove columns from your tasks or forms lists by adding or removing column definitions.

For more information on where to find the column definitions and where to cuztomize your columns, see [Customizing your columns](./customize.md).

## Remove a column
You can remove a column by removing the section that defines it.

To remove a column:
1. Scroll to the column you want to remove.
1. Select everything from the opening curly-brace `{` to the comma after the closing curly brace `},`.

```javascript
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },
```
1. Press the **Delete** key.
1. Save the file.
1. [Rebuild](build.md) your package.

## Add a new column
You can add a new column by adding a column definition to the list. You can add columns that either display the value of a field defined in the [data model](./data.md), or calculates its value using a function you define.

If you're comfortable adding new column definitions, use the [data model](./data.md) definitions to add your columns.

### Add a column from the data model
To add a column with a field from the data model:

1. Choose the [data model](./data.md) field you want to add to your columns, and note the **field name** and **data type**.

   Make sure you use the correct data model: you can't add forms data to a task list column.
1. Select and copy the first column definition from the opening curly-brace `{` to the closing curly-brace and comma `},`.

```javascript
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },
```
1. Scroll to where you want to add the column. 

   Make sure it's within the square brackets `[` `]` of the column definitions.
   
   ```javascript
    const nwcTasksColumns: IColumn[] = [    <--- Start of Tasks column definitions
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },

      <... more column definitions...>

    ];    <--- end of Tasks column definitions.
```
1. Paste the column definition you copied earlier where you want the new column to go.

   Make sure the section you have pasted is not between the curly-braces of another column definition.   
   
```javascript
    const nwcTasksColumns: IColumn[] = [    <--- Start of Tasks column definitions
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },
	  {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },

      <... more column definitions...>

    ];    <--- end of Tasks column definitions.
```
1. Update the number in the new column definition's `key` value to the total number of columns you have.

   The value in this field must be unique in your column definitions.
1. Update the `name` value to the label you want the new column to have.
1. Update the `fieldName` value to the field in the [data model](./data.md) you want the new column to display. 

   Make sure the `fieldName` matches one from the data model exactly, including capital letters.
1. Update the `data` value to the data type listed in the data model for the field you've selected.

```javascript
      {
        key: 'column8',
        name: 'Task message',
        fieldName: 'message',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },
```
1. Save the file.
1. [Rebuild](./build.md) your package.

### Add a column with a calculated value

_Note:_ Adding calculated fields requires creating a function. We recommend developer or coding experience for adding calculated fields.

To add a column with a calculated value:

1. Add your new column as per the _Add a column from the data model_ instructions above.
1. Add an `onRender` key to the column definition, if it isn't already there. 
1. In the `onRender` value, add the function to calculate the value to display in the column.

```javascript
{
        key: 'column4',
        name: 'Status',
        fieldName: 'status',
        minWidth: 100,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onRender: (item) => {
          if (item.status) {
            // uppercase for 1st letter
            let displayText: string = item.status;
            displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1);
            return <span>{displayText}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onTasksColumnClick
      },
```
1. Save the file.
1. [Rebuild](./build.md) your package.
