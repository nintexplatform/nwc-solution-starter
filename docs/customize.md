# Customize your task and form columns
You can customize the columns that display your tasks and forms to change their column header labels, column width, the order of the columns or even add or remove columns entirely. 

We recommend using a code editor that provides a console, such as [Visual Studio Code](https://code.visualstudio.com/), [Atom](https://atom.io/) or [Webstorm](https://www.jetbrains.com/webstorm).


## How to edit task and form columns
The task and form columns are controlled by a section of code in the **NwcTaskForms.tsx** file. You'll find the file in the **/src/webparts/nwcTasksForms/components/** folder of this repository.
  - The Task columns are controlled by the section that begins with the line `const nwcTasksColumns: IColumn[]  = [`.
  - The Forms columns are controlled by the section that begins with the line  `const nwcFormsColumns: IColumn[]  = [`.

Both the Task columns and the Forms columns follow the same rules:
  - Each section between curly braces {} creates a single column.
  - The fields within the curly braces define what that column should display, and how to display it.
  
After you customize your web part, you should [rebuild](./build.md) it for your environment, and [re-install](./install.md).

## Task and form column definition fields
|Property|Description|
|--------|-----------|
|key| The unique identifier of the column.| 
|name| The text that appears as the column heading.|
|fieldName| The form or task field that the column displays.|
|minWidth| The minimum width the column can display, in pixels.|
|maxWidth| The maximum width the column can display, in pixels.|
|isRowHeader| You should not edit this field.|
|isResizable| Whether the column allows the user to adjust its width.|
|isSorted| Whether the column data is sorted. You should not edit this field.|
|isSortedDescending| Whether the column data is sorted in descending order. You should not edit this field.|
|data| The data type of this column. This must match the data type of the fieldName as given in the model.|
|isPadded| Used to control the visual padding on a column. You should not edit this field.|
|onRender| Used to control how a value is displayed when parsing data or creating a calculated field.|
|onColumnClick| The function to perform when this column is clicked. You should not edit this field.|

When editing column definition fields:
  - Text values should be within single quotation marks: 'like this'.
  - Numbers should be whole numbers without decimal points.
  - True-or-false values should be either true or false in lowercase letters with no quotation marks.
  - There should always be a comma at the end of each row, _except_ the last row before a closing curly-brace.

## Rename, resize and reorder your columns
See how to:
  - [Change a column heading or size](./columnsRenameResize.md).
  - [Change the order of the columns](./columnsReorder.md).
  - [Add or remove a column](./columnsAddRemove.md).

