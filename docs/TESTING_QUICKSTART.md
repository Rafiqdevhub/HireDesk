# HireDesk Testing - Quick Start Guide for Developers

## 🚀 Getting Started

This guide helps developers quickly understand and contribute to the HireDesk testing strategy.

## 📦 Prerequisites

```bash
# Ensure you have the testing dependencies installed
npm install

# Install Playwright for E2E tests (optional, Phase 3+)
npx playwright install
```

## ⚡ Quick Commands

### Run Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (recommended for development)
npm run test -- --watch

# Run specific test file
npm run test -- authService.test.ts

# Run tests with coverage
npm run test:coverage

# Run tests with UI (visual test runner)
npm run test:ui

# Run E2E tests (Playwright - Phase 3+)
npx playwright test

# Run E2E tests with UI
npx playwright test --ui
```

### Generate Coverage Report

```bash
# Generate and view coverage
npm run test:coverage
# Open: coverage/index.html in your browser
```

## 📝 Writing Your First Test

### 1. Unit Test Example (Service)

**Location:** `__tests__/unit/services/myService.test.ts`

```typescript
import { describe, test, expect, vi, beforeEach } from "vitest";
import { myService } from "@services/myService";
import api from "@services/authService";

// Mock the API
vi.mock("@services/authService", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("myService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("myFunction", () => {
    test("should return data on success", async () => {
      // Arrange
      const mockData = { id: 1, name: "Test" };
      vi.mocked(api.get).mockResolvedValueOnce({ data: mockData });

      // Act
      const result = await myService.myFunction();

      // Assert
      expect(api.get).toHaveBeenCalledWith("/endpoint");
      expect(result).toEqual(mockData);
    });

    test("should handle errors gracefully", async () => {
      // Arrange
      vi.mocked(api.get).mockRejectedValueOnce(new Error("API Error"));

      // Act & Assert
      await expect(myService.myFunction()).rejects.toThrow("API Error");
    });
  });
});
```

### 2. Component Test Example (Integration)

**Location:** `__tests__/integration/components/MyComponent.test.tsx`

```typescript
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MyComponent } from '@components/MyComponent';
import { AuthProvider } from '@contexts/AuthContext';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  );
};

describe('MyComponent', () => {
  test('renders correctly', () => {
    renderWithProviders(<MyComponent />);

    expect(screen.getByText('My Component')).toBeInTheDocument();
  });

  test('handles user interaction', async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<MyComponent onSubmit={onSubmit} />);

    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('displays error message', async () => {
    renderWithProviders(<MyComponent />);

    // Trigger error
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });
});
```

### 3. E2E Test Example (Playwright)

**Location:** `__tests__/e2e/myFeature.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("My Feature", () => {
  test("user can complete flow", async ({ page }) => {
    // Navigate
    await page.goto("/my-feature");

    // Interact
    await page.fill('input[name="email"]', "test@example.com");
    await page.click('button[type="submit"]');

    // Verify
    await expect(page.locator("text=Success")).toBeVisible();
  });
});
```

## 🎯 Test Structure Best Practices

### AAA Pattern (Arrange, Act, Assert)

```typescript
test("should do something", async () => {
  // Arrange - Setup test data and mocks
  const mockData = { id: 1 };
  vi.mocked(api.get).mockResolvedValueOnce({ data: mockData });

  // Act - Execute the function under test
  const result = await myService.getData();

  // Assert - Verify the outcome
  expect(result).toEqual(mockData);
  expect(api.get).toHaveBeenCalledTimes(1);
});
```

### Descriptive Test Names

```typescript
// ✅ Good
test("should return user profile when authenticated");
test("should throw error when token is expired");
test("should display loading spinner during API call");

// ❌ Bad
test("test1");
test("works");
test("profile");
```

### Test Organization

```typescript
describe("ServiceName", () => {
  describe("methodName", () => {
    test("success scenario", () => {});
    test("error scenario", () => {});
    test("edge case", () => {});
  });

  describe("anotherMethod", () => {
    test("success scenario", () => {});
  });
});
```

## 🔧 Common Testing Patterns

### 1. Mocking API Calls

```typescript
// Mock entire module
vi.mock("@services/authService");

// Mock specific function
vi.mocked(api.post).mockResolvedValueOnce({ data: mockData });
vi.mocked(api.post).mockRejectedValueOnce(new Error("API Error"));

// Mock implementation
vi.mocked(api.post).mockImplementation(async (url) => {
  if (url === "/success") return { data: "success" };
  throw new Error("Failed");
});
```

### 2. Testing Async Operations

```typescript
test("async operation", async () => {
  const result = await myAsyncFunction();
  expect(result).toBe("expected");
});

// With error handling
test("async error", async () => {
  await expect(myAsyncFunction()).rejects.toThrow("Error message");
});
```

### 3. Testing React Components

```typescript
// Render component
render(<MyComponent />);

// Query elements
screen.getByText('Hello');                    // Throws if not found
screen.getByRole('button', { name: /submit/i });
screen.queryByText('Optional');                // Returns null if not found
await screen.findByText('Async content');      // Waits for element

// User interactions
fireEvent.change(input, { target: { value: 'test' } });
fireEvent.click(button);
fireEvent.submit(form);

// Wait for changes
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument();
});
```

### 4. Testing with Context

```typescript
// Wrapper for components needing context
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ToastProvider>
      {children}
    </ToastProvider>
  </AuthProvider>
);

// Use wrapper
render(<MyComponent />, { wrapper });
```

### 5. Testing File Uploads

```typescript
test('handles file upload', async () => {
  render(<FileUpload />);

  const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
  const input = screen.getByLabelText(/upload/i) as HTMLInputElement;

  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });
});
```

## 🐛 Debugging Tests

### 1. Use `screen.debug()`

```typescript
test('debug test', () => {
  render(<MyComponent />);

  // Print entire DOM
  screen.debug();

  // Print specific element
  screen.debug(screen.getByRole('button'));
});
```

### 2. Use Vitest UI

```bash
npm run test:ui
```

Opens a browser UI where you can:

- See test results visually
- Debug failing tests
- Inspect component snapshots
- View coverage

### 3. Use `test.only` for Focus

```typescript
// Run only this test
test.only("focused test", () => {
  // ...
});

// Skip this test
test.skip("skipped test", () => {
  // ...
});
```

### 4. Console Logs

```typescript
test("debug with console", () => {
  const result = myFunction();
  console.log("Result:", result);
  expect(result).toBe("expected");
});
```

## 🎨 Test Data & Fixtures

### Creating Test Fixtures

**Location:** `__tests__/fixtures/userFactory.ts`

```typescript
export const createMockUser = (overrides?: Partial<User>): User => ({
  id: "user-123",
  name: "Test User",
  email: "test@example.com",
  company_name: "Test Corp",
  filesUploaded: 5,
  ...overrides,
});

// Usage
const user1 = createMockUser();
const user2 = createMockUser({ name: "John Doe", email: "john@example.com" });
```

### File Fixtures

```typescript
// __tests__/fixtures/files.ts
export const createMockPDF = () => {
  return new File(["PDF content"], "resume.pdf", {
    type: "application/pdf",
  });
};

export const createMockDOCX = () => {
  return new File(["DOCX content"], "resume.docx", {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
};
```

## 📚 Common Test Utilities

### Custom Render Function

**Location:** `__tests__/utils/test-helpers.ts`

```typescript
import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '@contexts/AuthContext';
import { ToastProvider } from '@contexts/ToastContext';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
```

### Wait Utilities

```typescript
// Wait for specific condition
export const waitForLoadingToFinish = async () => {
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
};

// Wait for API call
export const waitForApiCall = async (mockFn: any) => {
  await waitFor(() => {
    expect(mockFn).toHaveBeenCalled();
  });
};
```

## 🔍 Testing Checklist for New Features

When adding a new feature, ensure:

### Unit Tests

- [ ] Service functions tested (success & error)
- [ ] Utility functions tested
- [ ] Custom hooks tested
- [ ] Error handling tested
- [ ] Edge cases covered

### Integration Tests

- [ ] Component renders correctly
- [ ] User interactions work
- [ ] Context integration works
- [ ] Form validation works
- [ ] API integration tested (mocked)

### E2E Tests (if critical flow)

- [ ] Complete user journey tested
- [ ] Happy path works
- [ ] Error scenarios handled
- [ ] Cross-browser tested

### Coverage

- [ ] 80%+ line coverage
- [ ] 80%+ branch coverage
- [ ] No untested critical paths

## 🚨 Common Testing Mistakes to Avoid

### ❌ Don't Do This

```typescript
// Testing implementation details
test('bad test', () => {
  const component = render(<MyComponent />);
  expect(component.container.querySelector('.my-class')).toBeInTheDocument();
});

// Not cleaning up mocks
test('test 1', () => {
  vi.mocked(api.post).mockResolvedValueOnce('result');
  // ...
});

test('test 2', () => {
  // This test might fail because mock from test 1 is still active!
  vi.mocked(api.post).mockResolvedValueOnce('different result');
});
```

### ✅ Do This Instead

```typescript
// Test user-facing behavior
test('good test', () => {
  render(<MyComponent />);
  expect(screen.getByText('My Component')).toBeInTheDocument();
});

// Clean up mocks
describe('MyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('test 1', () => {
    vi.mocked(api.post).mockResolvedValueOnce('result');
    // ...
  });

  test('test 2', () => {
    vi.mocked(api.post).mockResolvedValueOnce('different result');
    // ...
  });
});
```

## 📊 Coverage Goals

### Per File Type

- **Services:** 90%+ coverage (critical business logic)
- **Components:** 80%+ coverage
- **Utilities:** 90%+ coverage
- **Hooks:** 85%+ coverage

### Check Coverage

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/index.html

# Coverage thresholds are configured in vite.config.ts
```

## 🆘 Getting Help

### Resources

- **Full Roadmap:** `TESTING_ROADMAP.md`
- **Summary:** `docs/TESTING_SUMMARY.md`
- **Vitest Docs:** https://vitest.dev/
- **React Testing Library:** https://testing-library.com/
- **Playwright:** https://playwright.dev/

### Ask for Help

- Check existing tests in `__tests__/` for examples
- Review test utilities in `__tests__/utils/`
- Ask team members during code review
- Consult SDET team for complex scenarios

## 🎯 Your Next Steps

1. **Run existing tests** to ensure everything works

   ```bash
   npm run test
   ```

2. **Write tests for new features** before merging PRs

3. **Review test coverage** before submitting

   ```bash
   npm run test:coverage
   ```

4. **Follow the testing checklist** for quality

5. **Keep tests fast and reliable**
   - Aim for < 30 seconds total test run time
   - Use mocks to avoid real API calls
   - Clean up after tests

---

**Happy Testing! 🧪**

Remember: Good tests give you confidence to refactor and ship faster! 🚀
