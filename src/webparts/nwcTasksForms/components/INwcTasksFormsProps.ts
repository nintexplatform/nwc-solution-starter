export interface INwcTasksFormsProps {
  tenantName: string;
  clientId: string;
  needsConfiguration: boolean;
  errorHandler: (errorMessage: string) => void;
}