import { IColumn } from 'office-ui-fabric-react';
import { INintexForm } from '../../../models/INintexForm';
import { INintexTask } from '../../../models/INintexTask';

export interface INwcTasksFormsState {
  nwcTasks: INintexTask[];
  tasksColumns: IColumn[];
  tasksLoading: boolean;
  nwcForms: INintexForm[];
  formsColumns: IColumn[];
  formsLoading: boolean;
}