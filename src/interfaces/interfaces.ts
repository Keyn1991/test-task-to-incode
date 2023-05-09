export interface Issue {
  id: number;
  title: string;
  assignee: string;
  state: string;
}

export interface KanbanState {
  issues: Issue[];
  loading: boolean;
  error: string | null;
}

export const initialState: KanbanState = {
  issues: [],
  loading: false,
  error: null,
};

export interface IssueCardProps {
  issue: any;
}
