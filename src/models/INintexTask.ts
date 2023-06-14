import { INintexTaskAssignment } from './INintexTaskAssignment';

export interface INintexTask {
  actionInstanceId?: string;
  assignTo?: string;
  assignees?: string[];
  createdDate?: string;
  description?: string;
  dueDate?: string;
  id: string;
  message?: string;
  name?: string;
  outcomes?: string[];
  status?: string;
  subject?: string;
  workflowName?: string;
  workflowId?: string;
  workflowInstanceId?: string;
  taskAssignments: INintexTaskAssignment[];
}
