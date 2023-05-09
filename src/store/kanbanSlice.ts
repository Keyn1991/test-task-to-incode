import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { KanbanState } from '../interfaces/interfaces';
import { axiosService } from '../services';

const initialState: KanbanState = {
  issues: [],
  loading: false,
  error: null,
};

export const fetchIssuesAsync = createAsyncThunk(
  'kanban/fetchIssues',
  async (repoName: string) => {
    const response = await axiosService.get(`/repos/${repoName}/issues`);
    return response.data;
  }
);

export const moveIssue = createAsyncThunk(
  'kanban/moveIssue',
  async ({ issueId, newState }: { issueId: number; newState: string }) => {
    return { issueId, newState };
  }
);

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    deleteIssue: (state, action: PayloadAction<number>) => {
      const issueId = action.payload;
      state.issues = state.issues.filter((issue) => issue.id !== issueId);
    },
    setIssues: (state, action) => {
      state.issues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.issues = action.payload;
      })
      .addCase(fetchIssuesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching issues';
        state.issues = [];
      })
      .addCase(moveIssue.fulfilled, (state, action) => {
        const { issueId, newState } = action.payload;
        const issueIndex = state.issues.findIndex(
          (issue) => issue.id === issueId
        );
        if (issueIndex !== -1) {
          state.issues[issueIndex].state = newState;
        }
      });
  },
});

export const { setIssues, deleteIssue } = kanbanSlice.actions;
export default kanbanSlice.reducer;
