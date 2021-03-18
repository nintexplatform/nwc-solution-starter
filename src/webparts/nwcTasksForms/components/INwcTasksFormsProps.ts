export interface INwcTasksFormsProps {
  tenantName: string;
  needsConfiguration: boolean;
  errorHandler: (errorMessage: string) => void;
}