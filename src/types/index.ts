export interface FormDataState {
  name: string;
  email: string;
  file: File | null;
  fileName: string;
  fileSize: number;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  n8nStatus?: number;
  candidate?: {
    name: string;
    email: string;
    fileName: string;
    fileSize: number;
  };
  formResponseSnippet?: string;
  timestamp: string;
}

export interface WorkflowInfo {
  name: string;
  url: string;
  fields: {
    id: string;
    name: string;
    type: string;
    required: boolean;
    accept?: string[];
  }[];
  status: string;
  timestamp: string;
}

export interface AtsMetric {
  category: string;
  score: number;
  status: 'optimal' | 'warning' | 'needs_work';
  details: string;
  recommendation: string;
}
