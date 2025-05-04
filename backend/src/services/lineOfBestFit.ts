import { Point, LineEquation } from '../types';

export class LineOfBestFitService {
  static calculateLineOfBestFit(points: Point[]): LineEquation {
    const n = points.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    points.forEach(point => {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumXX += point.x * point.x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  }

  static isCorrectAnswer(points: Point[], studentAnswer: LineEquation, tolerance = 0.1): boolean {
    const correctAnswer = this.calculateLineOfBestFit(points);
    
    const slopeDiff = Math.abs(correctAnswer.slope - studentAnswer.slope);
    const interceptDiff = Math.abs(correctAnswer.intercept - studentAnswer.intercept);
    
    return slopeDiff <= tolerance && interceptDiff <= tolerance;
  }

  static generateRandomPoints(count = 5): Point[] {
    const points: Point[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 10) + 1;
      points.push({ x, y });
    }
    return points;
  }
} 