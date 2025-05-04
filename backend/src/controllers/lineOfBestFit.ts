import { Request, Response } from 'express';
import { LineOfBestFitService } from '../services/lineOfBestFit';
import { LineOfBestFitRequest, LineOfBestFitResponse } from '../types';

export class LineOfBestFitController {
  static async checkAnswer(req: Request, res: Response): Promise<void> {
    try {
      const { points, studentAnswer, studentName }: LineOfBestFitRequest = req.body;

      if (!points || !studentAnswer || !studentName) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const isCorrect = LineOfBestFitService.isCorrectAnswer(points, studentAnswer);
      const correctAnswer = LineOfBestFitService.calculateLineOfBestFit(points);

      const response: LineOfBestFitResponse = {
        isCorrect,
        correctAnswer: isCorrect ? undefined : correctAnswer,
        message: isCorrect 
          ? 'Correct! Well done!' 
          : 'Incorrect. Try again!'
      };

      res.json(response);
    } catch (error) {
      console.error('Error checking answer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async generatePoints(req: Request, res: Response): Promise<void> {
    try {
      const points = LineOfBestFitService.generateRandomPoints();
      res.json({ points });
    } catch (error) {
      console.error('Error generating points:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 