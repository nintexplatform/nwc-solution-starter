# Change the order of the columns
You can change the order the columns appear in your tasks and form lists.

For more information on where to find the column definitions and where to cuztomize your columns, see [Customizing your columns](./customize.md).

## Reorder your columns
The column order is controlled by the order the column definitions appear in the section. 
You can change the order your columns appear in by cutting and pasting the column definitions into a new order.

To reorder your columns:
1. Scroll to the column you want to move.
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
1. Either right-click and select **Cut**, or press **Ctrl-X** to cut your selection.
1. Scroll to where you want the column to be. 

   Make sure you are still within the square brackets `[`  `]` of the Task or Forms column definitions.

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
1. Paste the column in the new order you want it to appear.

   Make sure the section you have pasted is not between the curly-braces of another column definition.   
   
```javascript
    const nwcTasksColumns: IColumn[] = [    <--- Start of Tasks column definitions
      {
        key: 'column3',
        name: 'Workflow name',
        fieldName: 'workflow',
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
1. Save the file.
1. [Rebuild](./build.md) your package.
