export interface Point {
  x: number;
  y: number;
}

export interface LineEquation {
  slope: number;
  intercept: number;
}

export interface LineOfBestFitResponse {
  isCorrect: boolean;
  correctAnswer?: LineEquation;
  message: string;
}

export interface StudentAttempt {
  points: Point[];
  studentAnswer: LineEquation;
  isCorrect: boolean;
  timestamp: string;
} 