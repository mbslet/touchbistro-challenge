export interface Point {
  x: number;
  y: number;
}

export interface LineEquation {
  slope: number;
  intercept: number;
}

export interface LineOfBestFitRequest {
  points: Point[];
  studentAnswer: LineEquation;
  studentName: string;
}

export interface LineOfBestFitResponse {
  isCorrect: boolean;
  correctAnswer?: LineEquation;
  message: string;
} 