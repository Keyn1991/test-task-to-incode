import { axiosService } from './axios.Service';
import { Issue } from '../interfaces/interfaces';

export const fetchIssues = async (repoName: string): Promise<Issue[]> => {
  try {
    const response = await axiosService.get(`/repos/${repoName}/issues`);
    return response.data;
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
};
