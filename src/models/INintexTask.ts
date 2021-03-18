import { INintexUrls } from './INintexUrls';

export interface INintexTask {
    actionInstanceId?: string;
    assignTo?: string;
    assignees?: string[];
    created?: string;
    description?: string;
    dueDate?: string;
    id: string;
    message?: string;
    name?: string;
    outcomes?: string[];
    status?: string;
    subject?: string;
    workflow?: string;
    workflowId?: string;
    workflowInstanceId?: string;
    urls?: INintexUrls;
}
