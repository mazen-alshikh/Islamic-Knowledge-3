# Islamic Knowledge Platform - Developer Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Architecture](#architecture)
5. [Best Practices](#best-practices)
6. [Testing](#testing)
7. [Deployment](#deployment)

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation
```bash
git clone <repository-url>
cd islamic-knowledge-platform
npm install
```

### Development Server
```bash
# Start the frontend development server
npm run dev

# Start the backend server
npm run server
```

## Project Structure

```
├── docs/               # Documentation files
├── public/            # Static assets
├── server/            # Backend server
│   ├── config/        # Server configuration
│   ├── controllers/   # Request handlers
│   ├── data/         # Data storage
│   ├── middleware/   # Express middleware
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── utils/        # Utility functions
└── src/              # Frontend source code
    ├── components/   # React components
    ├── contexts/     # React contexts
    ├── hooks/        # Custom React hooks
    ├── lib/          # Utility libraries
    ├── pages/        # Page components
    └── types/        # TypeScript types
```

## Development Workflow

### Code Organization
1. **Components**: Create small, reusable components in `src/components/`
2. **Pages**: Place page components in `src/pages/`
3. **API Integration**: Use the API client in `src/lib/api/client.ts`
4. **State Management**: Use React Context for global state
5. **Styling**: Use Tailwind CSS for styling

### Coding Standards
- Use TypeScript for type safety
- Follow ESLint rules
- Write unit tests for critical functionality
- Use meaningful component and variable names
- Document complex logic with comments

## Architecture

### Frontend
- React with TypeScript
- React Router for routing
- React Hook Form for forms
- Tailwind CSS for styling
- Vite for building and development

### Backend
- Node.js with Express
- SQLite database with sql.js
- JWT authentication
- Winston for logging
- Natural for text processing

## Best Practices

### Component Design
```typescript
// Good: Small, focused component
function SearchInput({ onSearch }: SearchInputProps) {
  return (
    <input
      type="search"
      onChange={(e) => onSearch(e.target.value)}
      className="rounded-lg border p-2"
    />
  );
}

// Bad: Large, unfocused component
function SearchSection() {
  // Too many responsibilities in one component
  // Split into smaller components
}
```

### API Integration
```typescript
// Good: Use the API client
import { apiClient } from '@lib/api/client';

async function fetchData() {
  try {
    const data = await apiClient('/endpoint');
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Bad: Direct fetch calls
fetch('/api/endpoint')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Error Handling
```typescript
// Good: Proper error handling
try {
  await someAsyncOperation();
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API-specific errors
  } else {
    // Handle other errors
  }
}

// Bad: Generic error handling
try {
  await someAsyncOperation();
} catch (error) {
  console.error(error);
}
```

## Testing

### Unit Tests
```typescript
import { expect, test } from 'vitest';
import { SearchForm } from './SearchForm';

test('SearchForm submits query', async () => {
  const onSearch = vi.fn();
  render(<SearchForm onSearch={onSearch} />);
  
  // Test implementation
});
```

### Integration Tests
- Test API integration
- Test form submissions
- Test authentication flow
- Test search functionality

## Deployment

### Build Process
```bash
# Build the frontend
npm run build

# Start production server
npm run preview
```

### Environment Variables
Required environment variables:
- `VITE_API_URL`: API endpoint URL
- `VITE_JWT_SECRET`: JWT secret key
- `PORT`: Server port

### Production Considerations
1. Enable production mode
2. Configure proper CORS settings
3. Set up proper logging
4. Configure rate limiting
5. Enable security headers