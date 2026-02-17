import '@testing-library/jest-dom';

// Mock environment variables for tests
process.env.MONGODB_URI = 'mongodb://localhost:27017/brightflow-test';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api';
