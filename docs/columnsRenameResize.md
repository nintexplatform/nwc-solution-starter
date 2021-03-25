# Rename and resize your columns

You can change the column header and the column size of any column in your form or task lists.

For more information on where to find the column definitions and where to cuztomize your columns, see [Customizing your columns](./customize.md).

## Change a column label
The column label is controlled by the `name` field in the column definition. To change a column label:

1. Scroll to the column you want to change.
1. Next to the `name` field, change the value to the label you want that column to display.

   Make sure the value is within single quotation marks, with a comma at the end of the line.  
   ```javascript
     const nwcTasksColumns: IColumn[] = [
      {
        key: 'column1',
        name: 'My New Column Name',
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
1. Save the file.
1. [Rebuild](./build.md) your package.


## Change the minimum or maximum width of a column
You can control how narrow or wide someone can make a column in the list. This is useful for creating an easy-to-read layout if the column's contents are much longer or shorter than other columns.

  - Use a larger minimum width to make sure a column is wide enough to easily read the contents.
  - Use a smaller maximum width to shrink a column that will only contain a small amount of content.
  - Make sure your maximum width is always a larger number than your minimum width.


To change a column's minimum or maximum width:

1. Scroll to the column you want to edit.
2. To change the minimum width of the column, type the new minimum width in pixels next to the `minWidth` field.

   Make sure you don't use single quotation marks or decimal points, and that there's a comma at the end of the line.  
   ```javascript
     const nwcTasksColumns: IColumn[] = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 300,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },  
   ```   
4. To change the maximum width of the column, type the new maximum width in pixels next to the `maxWidth` field.
   
      Make sure you don't use single quotation marks or decimal points, and that there's a comma at the end of the line.  
   ```javascript
     const nwcTasksColumns: IColumn[] = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 250,
        maxWidth: 800,
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