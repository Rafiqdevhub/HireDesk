# Testing Guide

This document outlines the testing setup and guidelines for the HireDesk project.

## 🧪 Testing Stack

- **Vitest** - Test runner and framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Additional DOM matchers
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM environment for testing
- **MSW** - API mocking (future implementation)

## 🚀 Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode (recommended for development)
npm run test

# Run tests with coverage report
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

## 📁 Test Structure

```
__tests__/
├── setup/
│   └── test-setup.ts          # Global test configuration
├── unit/                      # Unit tests
│   ├── hooks/                 # Custom hook tests
│   ├── utils/                 # Utility function tests
│   └── services/              # Service/API tests
└── integration/               # Integration tests
    ├── components/            # Component integration tests
    └── routes/                # Route/page tests
```

## 📝 Writing Tests

### Test File Naming Convention

- Unit tests: `filename.test.ts`
- Integration tests: `filename.spec.ts`

### Example Test Structure

```typescript
import { describe, test, expect } from "vitest";

describe("Component Name", () => {
  test("should render correctly", () => {
    // Test implementation
  });

  test("should handle user interactions", () => {
    // Test implementation
  });
});
```

## 🛠️ Test Utilities

### Rendering Components

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Render component
render(<MyComponent />)

// Find elements
const button = screen.getByRole('button', { name: /click me/i })

// Simulate user interactions
await userEvent.click(button)
```

### Mocking APIs

```typescript
import { vi } from "vitest";

// Mock a function
const mockFn = vi.fn();

// Mock a module
vi.mock("@/services/api", () => ({
  fetchData: vi.fn(),
}));
```

## 🎯 Testing Guidelines

### Unit Tests

- Test individual functions and hooks in isolation
- Mock external dependencies
- Focus on logic and edge cases

### Integration Tests

- Test component interactions
- Test complete user flows
- Include realistic data and state

### Best Practices

- Use descriptive test names
- Test both success and error scenarios
- Keep tests fast and reliable
- Use appropriate assertions
- Clean up after tests

## 📊 Coverage Goals

- **Hooks:** 90%+ coverage
- **Services:** 85%+ coverage
- **Components:** 80%+ coverage
- **Overall:** 75%+ coverage

## 🔧 Configuration

Test configuration is in `vite.config.ts`:

```typescript
test: {
  environment: 'jsdom',
  setupFiles: ['./__tests__/setup/test-setup.ts'],
  globals: true,
  css: true,
}
```

Global setup includes:

- Jest DOM matchers
- Browser API mocks (localStorage, sessionStorage)
- ResizeObserver and IntersectionObserver mocks
- Automatic cleanup after each test
