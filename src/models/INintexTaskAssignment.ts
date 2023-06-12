import { INintexUrls } from "./INintexUrls";

export interface INintexTaskAssignment {
  status: string;
  assignee: string;
  urls?: INintexUrls;
}
