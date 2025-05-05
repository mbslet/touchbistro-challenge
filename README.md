# Full Stack - Developer Challenge

## Submission Questions

1. **Do you have production experience with Node prior to the submission of this code challenge? If yes, for how long?**  
   Yes, I have approximately 5 years of professional experience working with Node.js. I've used it extensively to build RESTful APIs, background workers, and real-time services using frameworks like Express.

2. **Do you have production experience with React prior to the submission of this code challenge? If yes, for how long?**  
   Yes, I have around 5 years of production experience with React. I’ve built and maintained front-end applications using React with TypeScript, Hooks, and various state management solutions such as Context API and Redux.

3. **Your full name (to ensure we can map back your submission to your resume):**  
   Leticia Meneses Chermont da Silva



## Setup Instructions

### Database Setup

1. Create a PostgreSQL database:
```bash
createdb line_of_best_fit
```

2. Set up environment variables:
Create a `.env` file in the backend directory with the following content:
```
DATABASE_URL=postgresql://username:password@localhost:5432/line_of_best_fit
PORT=3001
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Run database migrations:
```bash
npm run migrate
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```