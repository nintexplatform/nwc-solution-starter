import { INintexUrls } from './INintexUrls';
import { INintexWorkflow } from './INintexWorkflow';

export interface INintexForm {
    id: string;
    name?: string;
    description?: string;
    lastModified?: string;
    urls?: INintexUrls;
    favourite?: boolean;
    workflow?: INintexWorkflow;
}
