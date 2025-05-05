import axios from 'axios';
import { Point, LineEquation, LineOfBestFitResponse } from '../types';

const API_URL = 'http://localhost:3001/api';

export const api = {
  generatePoints: async (): Promise<{ points: Point[] }> => {
    const response = await axios.get(`${API_URL}/line-of-best-fit/generate-points`);
    return response.data;
  },

  checkAnswer: async (
    points: Point[],
    studentAnswer: LineEquation,
    studentName: string
  ): Promise<LineOfBestFitResponse> => {
    const response = await axios.post(`${API_URL}/line-of-best-fit/check-answer`, {
      points,
      studentAnswer,
      studentName,
    });
    return response.data;
  },
}; 