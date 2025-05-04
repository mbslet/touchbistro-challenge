import { LineOfBestFitService } from './lineOfBestFit';
import { Point, LineEquation } from '../types';

describe('LineOfBestFitService', () => {
  describe('calculateLineOfBestFit', () => {
    it('should calculate the correct line of best fit', () => {
      const points: Point[] = [
        { x: 2, y: 4 },
        { x: 3, y: 5 },
        { x: 5, y: 7 },
        { x: 7, y: 10 },
        { x: 9, y: 15 }
      ];

      const result = LineOfBestFitService.calculateLineOfBestFit(points);
      
      expect(result.slope).toBeCloseTo(1.5, 1);
      expect(result.intercept).toBeCloseTo(0.3, 1);
    });
  });

  describe('isCorrectAnswer', () => {
    it('should return true for correct answers within tolerance', () => {
      const points: Point[] = [
        { x: 2, y: 4 },
        { x: 3, y: 5 }
      ];
      const studentAnswer: LineEquation = {
        slope: 1.0,
        intercept: 2.0
      };

      const result = LineOfBestFitService.isCorrectAnswer(points, studentAnswer, 0.2);
      expect(result).toBe(true);
    });

    it('should return false for incorrect answers', () => {
      const points: Point[] = [
        { x: 2, y: 4 },
        { x: 3, y: 5 }
      ];
      const studentAnswer: LineEquation = {
        slope: 2.0,
        intercept: 0.0
      };

      const result = LineOfBestFitService.isCorrectAnswer(points, studentAnswer);
      expect(result).toBe(false);
    });
  });

  describe('generateRandomPoints', () => {
    it('should generate the specified number of points', () => {
      const count = 5;
      const points = LineOfBestFitService.generateRandomPoints(count);
      
      expect(points).toHaveLength(count);
      points.forEach(point => {
        expect(point.x).toBeGreaterThanOrEqual(1);
        expect(point.x).toBeLessThanOrEqual(10);
        expect(point.y).toBeGreaterThanOrEqual(1);
        expect(point.y).toBeLessThanOrEqual(10);
      });
    });
  });
}); 