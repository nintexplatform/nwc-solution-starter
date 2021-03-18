import { IColumn } from 'office-ui-fabric-react';
import { INintexForm } from '../../../models/INintexForm';
import { INintexTask } from '../../../models/INintexTask';

export interface INwcTasksFormsState {
  nwcTasks: INintexTask[];
  tasksColumns: IColumn[];
  nwcForms: INintexForm[];
  formsColumns: IColumn[];
}