import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Line, LineChart } from 'recharts';
import { api } from './services/api';
import { Point, LineEquation, LineOfBestFitResponse } from './types';

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [studentName, setStudentName] = useState('');
  const [slope, setSlope] = useState('');
  const [intercept, setIntercept] = useState('');
  const [response, setResponse] = useState<LineOfBestFitResponse | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    generateNewPoints();
  }, []);

  const generateNewPoints = async () => {
    try {
      const { points: newPoints } = await api.generatePoints();
      setPoints(newPoints);
      setResponse(null);
      setAttempts(0);
    } catch (error) {
      console.error('Error generating points:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !slope || !intercept) return;

    try {
      const studentAnswer: LineEquation = {
        slope: parseFloat(slope),
        intercept: parseFloat(intercept),
      };

      const result = await api.checkAnswer(points, studentAnswer, studentName);
      setResponse(result);
      setAttempts(prev => prev + 1);

      if (result.isCorrect) {
        generateNewPoints();
      } else if (attempts >= 2) {
        generateNewPoints();
      }
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  const renderChart = () => {
    const data = points.map(point => ({ x: point.x, y: point.y }));
    const lineData = response?.correctAnswer
      ? [
          { x: Math.min(...points.map(p => p.x)), y: response.correctAnswer.slope * Math.min(...points.map(p => p.x)) + response.correctAnswer.intercept },
          { x: Math.max(...points.map(p => p.x)), y: response.correctAnswer.slope * Math.max(...points.map(p => p.x)) + response.correctAnswer.intercept },
        ]
      : [];

    return (
      <Box sx={{ mt: 4 }}>
        <ScatterChart width={600} height={400}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="x" />
          <YAxis type="number" dataKey="y" name="y" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fill="#8884d8" />
          {lineData.length > 0 && (
            <Line type="monotone" data={lineData} dataKey="y" stroke="#ff7300" dot={false} />
          )}
        </ScatterChart>
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Line of Best Fit Challenge
        </Typography>

        <Paper sx={{ p: 3, mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Slope"
              type="number"
              value={slope}
              onChange={(e) => setSlope(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Intercept"
              type="number"
              value={intercept}
              onChange={(e) => setIntercept(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Check Answer
            </Button>
          </form>

          {response && (
            <Alert severity={response.isCorrect ? 'success' : 'error'} sx={{ mt: 2 }}>
              {response.message}
            </Alert>
          )}

          {renderChart()}
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
