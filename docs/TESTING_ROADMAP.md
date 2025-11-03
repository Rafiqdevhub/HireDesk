# HireDesk Testing Roadmap - SDET Strategy

**Document Version:** 1.0.0  
**Created:** October 30, 2025  
**SDET Lead:** Quality Assurance Team  
**Project:** HireDesk - AI-Powered Recruitment Platform

---

## 📋 Executive Summary

This roadmap outlines a comprehensive, phased testing strategy for HireDesk, an AI-powered recruitment platform built with React Router 7, TypeScript, and integrated with external AI/Auth APIs. The testing approach follows industry best practices with a focus on quality gates, automation, and continuous improvement.

### Current Test Coverage Status

- ✅ **Unit Tests:** Partial (fileService only)
- ⚠️ **Integration Tests:** Minimal
- ❌ **E2E Tests:** Not implemented
- ❌ **API Contract Tests:** Not implemented
- ❌ **Performance Tests:** Not implemented
- ❌ **Security Tests:** Not implemented

### Target Coverage Goals

- **Unit Tests:** 80%+ coverage
- **Integration Tests:** 70%+ coverage
- **E2E Tests:** Critical user flows (100% coverage)
- **API Tests:** All endpoints validated
- **Performance:** Page load < 3s, API response < 2s

---

## 🎯 Testing Objectives

1. **Ensure Quality:** Catch bugs before production
2. **Prevent Regressions:** Automated test suite for CI/CD
3. **Validate User Experience:** E2E testing of critical flows
4. **API Reliability:** Contract testing with external services
5. **Performance:** Meet performance benchmarks
6. **Security:** Validate authentication, authorization, and data protection
7. **Accessibility:** WCAG 2.1 AA compliance

---

## 🏗️ Application Architecture Overview

### Frontend Stack

- **Framework:** React 19.1.0 + React Router 7.9.1
- **Language:** TypeScript 5.8.3
- **Styling:** Tailwind CSS 4.1.4
- **Build Tool:** Vite 6.3.3
- **Testing:** Vitest 3.2.4 + React Testing Library 16.3.0

### External Dependencies

- **AI API:** `https://jobpsych-ai.vercel.app/api`
  - `/hiredesk-analyze` - Single resume analysis
  - `/batch-analyze` - Batch resume processing (2-5 files)
  - `/compare-candidates` - Candidate comparison
  - `/selection-candidate` - FIT/REJECT decisions

- **Auth API:** `https://jobpsych-auth.vercel.app/api`
  - `/auth/register` - User registration
  - `/auth/login` - User login
  - `/auth/refresh` - Token refresh
  - `/auth/verify-email` - Email verification
  - `/auth/forgot-password` - Password reset request
  - `/auth/reset-password` - Password reset confirmation

### Key Features to Test

1. **Authentication System** (Login, Register, Verification, Password Reset)
2. **Resume Upload & Analysis** (Single file analysis)
3. **Batch Analysis** (2-5 resumes)
4. **Candidate Comparison** (Compare 2 candidates)
5. **Candidate Selection** (FIT/REJECT screening)
6. **Dashboard & Profile Management**
7. **Rate Limiting** (API quotas)
8. **Session Persistence** (LocalStorage/SessionStorage)

---

## 📊 Testing Phases

## Phase 1: Foundation & Unit Testing (Weeks 1-3)

### Goals

- Establish testing infrastructure
- Achieve 80%+ unit test coverage
- Setup CI/CD pipeline integration
- Document testing standards

### 1.1 Testing Infrastructure Setup

#### Tasks

- [x] Vitest configuration complete
- [x] React Testing Library setup
- [x] MSW (Mock Service Worker) configured
- [ ] Test data factories/fixtures
- [ ] Custom test utilities enhancement
- [ ] Visual regression testing setup (optional)

#### Deliverables

```bash
# Enhanced test configuration
vite.config.ts - Enhanced with coverage thresholds
__tests__/setup/test-setup.ts - Complete browser API mocks
__tests__/mocks/handlers.ts - MSW API handlers
__tests__/fixtures/ - Test data generators
__tests__/utils/test-helpers.ts - Common test utilities
```

#### Code Example: Test Data Factory

```typescript
// __tests__/fixtures/userFactory.ts
export const createMockUser = (overrides?: Partial<User>): User => ({
  id: "user-123",
  name: "Test User",
  email: "test@example.com",
  company_name: "Test Corp",
  filesUploaded: 5,
  selected_candidate: 3,
  compared_candidate: 2,
  ...overrides,
});

export const createMockResume = (overrides?: Partial<File>): File => {
  const content = "Mock resume content";
  return new File([content], "resume.pdf", {
    type: "application/pdf",
    ...overrides,
  });
};
```

### 1.2 Service Layer Unit Tests (Priority: HIGH)

#### Services to Test

1. ✅ **fileService.ts** (Partially complete)
2. ⚠️ **authService.ts** (Critical - needs full coverage)
3. ⚠️ **aiService.ts** (Critical - needs full coverage)

#### Testing Strategy

- Mock axios/api calls
- Test success scenarios
- Test error handling (422, 429, 500, network errors)
- Test token refresh logic
- Test rate limit responses
- Validate FormData construction

#### Test Cases for authService.ts

```typescript
// __tests__/unit/services/authService.test.ts

describe('authService', () => {
  describe('register', () => {
    ✓ Successfully registers user
    ✓ Stores access token in localStorage
    ✓ Returns user object
    ✓ Handles duplicate email error (422)
    ✓ Handles validation errors
    ✓ Handles network errors
  });

  describe('login', () => {
    ✓ Successfully logs in user
    ✓ Stores access token
    ✓ Handles invalid credentials (401)
    ✓ Handles unverified email (403)
    ✓ Handles network errors
  });

  describe('refreshToken', () => {
    ✓ Successfully refreshes token
    ✓ Updates localStorage
    ✓ Handles expired refresh token (401)
    ✓ Redirects to login on failure
  });

  describe('getProfile', () => {
    ✓ Fetches user profile with valid token
    ✓ Triggers refresh on 401
    ✓ Handles network errors
  });

  describe('forgotPassword', () => {
    ✓ Sends password reset email
    ✓ Handles non-existent email
    ✓ Handles rate limiting
  });

  describe('resetPassword', () => {
    ✓ Resets password with valid token
    ✓ Handles invalid token
    ✓ Handles expired token
  });
});
```

#### Test Cases for aiService.ts

```typescript
// __tests__/unit/services/aiService.test.ts

describe('aiService', () => {
  describe('hireDeskAnalyze', () => {
    ✓ Successfully analyzes resume
    ✓ Constructs FormData correctly
    ✓ Includes JWT token in headers
    ✓ Handles file format errors (422)
    ✓ Handles rate limit errors (429)
    ✓ Handles invalid file content
    ✓ Handles network errors
    ✓ Parses success response correctly
  });

  describe('batchAnalyze', () => {
    ✓ Analyzes 2-5 files successfully
    ✓ Handles file count validation
    ✓ Constructs FormData with multiple files
    ✓ Returns results for all files
    ✓ Handles partial failures
    ✓ Handles rate limit errors
  });

  describe('compareCandidates', () => {
    ✓ Compares 2 candidates
    ✓ Returns comparison result
    ✓ Handles invalid candidate data
    ✓ Handles rate limiting
  });

  describe('selectionCandidate', () => {
    ✓ Evaluates candidates (1-5 resumes)
    ✓ Returns FIT/REJECT decisions
    ✓ Includes job title and keywords
    ✓ Handles rate limiting (10/day quota)
    ✓ Validates file count (1-5)
  });
});
```

### 1.3 Utility & Helper Function Tests

#### Files to Test

```typescript
// __tests__/unit/utils/errorHandler.test.ts
- extractErrorMessage()
- handleApiError()
- formatValidationErrors()

// __tests__/unit/utils/api.test.ts
- API URL configurations
- Environment-based API selection

// __tests__/unit/hooks/useForm.test.ts
- Form validation
- Error handling
- Submit logic

// __tests__/unit/hooks/useToastHelpers.test.ts
- Toast notification triggers
- Success/error/warning messages
```

### 1.4 CI/CD Integration

#### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run typecheck
      - run: npm run test:coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  quality-gate:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Check coverage threshold
        run: |
          if [ "$COVERAGE" -lt "80" ]; then
            echo "Coverage below 80%"
            exit 1
          fi
```

### Phase 1 Success Metrics

- ✅ 80%+ unit test coverage
- ✅ All services have comprehensive test suites
- ✅ CI/CD pipeline running tests on every PR
- ✅ Test execution time < 30 seconds
- ✅ Zero flaky tests

---

## Phase 2: Integration Testing (Weeks 3-5)

**Status: 🟡 READY TO START**  
**Dependencies: ✅ Phase 1 Complete (Unit Tests - 90 tests, 80.78% coverage)**  
**Estimated Duration: 3 weeks**  
**Team Size: 1-2 developers**

### 📋 Phase 2 Overview

Integration testing validates how components, contexts, and services work together. This phase focuses on testing user workflows, API integration, and component interaction patterns rather than isolated unit functionality.

### 🎯 Primary Goals

1. **Component Integration** - Test how UI components interact with contexts and services
2. **Context Provider Validation** - Ensure AuthContext and ToastContext work correctly
3. **API Flow Testing** - Validate complete request-response cycles with MSW
4. **User Journey Testing** - Test critical paths users take through the app
5. **Error Handling Integration** - Verify error boundaries and user feedback work together

---

## 🗓️ Week-by-Week Breakdown

### **Week 3: Foundation & Context Integration**

- ✅ **Day 1-2**: MSW setup and API mocking infrastructure
- ✅ **Day 3-4**: AuthContext integration tests (8 test scenarios)
- ✅ **Day 5**: ToastContext integration tests (7 test scenarios)

### **Week 4: Component Integration**

- ✅ **Day 1-2**: Authentication flow tests (Login, Register, Password Reset)
- ✅ **Day 3-4**: Resume analysis flow tests (Upload, Analysis, Results)
- ✅ **Day 5**: Protected route and navigation tests

### **Week 5: Advanced Flows & Error Handling**

- ✅ **Day 1-2**: Batch analysis integration tests
- ✅ **Day 3-4**: Candidate selection integration tests
- ✅ **Day 5**: Error boundary and edge case testing

---

## 🏗️ Integration Testing Architecture

### Test Structure

```bash
__tests__/
├── integration/
│   ├── contexts/
│   │   ├── AuthContext.integration.test.tsx
│   │   └── ToastContext.integration.test.tsx
│   ├── flows/
│   │   ├── AuthenticationFlow.test.tsx
│   │   ├── ResumeAnalysisFlow.test.tsx
│   │   ├── BatchAnalysisFlow.test.tsx
│   │   └── CandidateSelectionFlow.test.tsx
│   ├── components/
│   │   ├── auth/
│   │   ├── resume/
│   │   ├── batch/
│   │   └── ui/
│   └── routes/
│       ├── ProtectedRoute.test.tsx
│       └── NavigationFlow.test.tsx
├── mocks/
│   ├── handlers/
│   │   ├── auth.handlers.ts
│   │   ├── ai.handlers.ts
│   │   └── file.handlers.ts
│   ├── data/
│   │   ├── mockUsers.ts
│   │   ├── mockAnalysis.ts
│   │   └── mockFiles.ts
│   └── server.ts
└── utils/
    ├── test-helpers.tsx
    └── integration-utils.ts
```

### Integration Test Setup Pattern

```typescript
// __tests__/utils/integration-utils.ts
export const createIntegrationWrapper = ({
  initialAuth = null,
  mockHandlers = []
}) => {
  const AllProviders = ({ children }: { children: ReactNode }) => (
    <MemoryRouter>
      <AuthProvider initialUser={initialAuth}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>
  );

  return AllProviders;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => screen.queryByTestId('loading-spinner'));

export const mockFileUpload = (fileName = 'test-resume.pdf') =>
  new File(['mock content'], fileName, { type: 'application/pdf' });
```

---

## 🧪 Detailed Test Implementation

### 2.1 Context Integration Tests (Priority: HIGH)

#### AuthContext Integration Tests

```typescript
// __tests__/integration/contexts/AuthContext.integration.test.tsx

describe('AuthContext Integration', () => {
  let server: SetupServer;

  beforeAll(() => {
    server = setupServer(...authHandlers);
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });

  afterAll(() => {
    server.close();
  });

  describe('Authentication State Management', () => {
    test('initializes with null user when not authenticated', () => {
      const TestComponent = () => {
        const { user, isAuthenticated } = useAuth();
        return (
          <div>
            <span data-testid="user-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</span>
            <span data-testid="user-data">{user ? user.name : 'no-user'}</span>
          </div>
        );
      };

      render(<TestComponent />, { wrapper: createIntegrationWrapper() });

      expect(screen.getByTestId('user-status')).toHaveTextContent('not-authenticated');
      expect(screen.getByTestId('user-data')).toHaveTextContent('no-user');
    });

    test('loads user from localStorage on mount', () => {
      // Pre-populate localStorage
      localStorage.setItem('accessToken', 'valid-token');
      localStorage.setItem('user', JSON.stringify(createMockUser()));

      const TestComponent = () => {
        const { user, isAuthenticated } = useAuth();
        return (
          <div>
            <span data-testid="user-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</span>
            <span data-testid="user-name">{user?.name || 'no-name'}</span>
          </div>
        );
      };

      render(<TestComponent />, { wrapper: createIntegrationWrapper() });

      expect(screen.getByTestId('user-status')).toHaveTextContent('authenticated');
      expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
    });

    test('updates user state on successful login', async () => {
      const TestComponent = () => {
        const { login, user, isAuthenticated } = useAuth();

        const handleLogin = () => {
          login({ email: 'test@example.com', password: 'Test123!' });
        };

        return (
          <div>
            <button onClick={handleLogin} data-testid="login-btn">Login</button>
            <span data-testid="user-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</span>
            <span data-testid="user-name">{user?.name || 'no-name'}</span>
          </div>
        );
      };

      render(<TestComponent />, { wrapper: createIntegrationWrapper() });

      expect(screen.getByTestId('user-status')).toHaveTextContent('not-authenticated');

      fireEvent.click(screen.getByTestId('login-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('user-status')).toHaveTextContent('authenticated');
        expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
      });

      // Verify localStorage was updated
      expect(localStorage.getItem('accessToken')).toBeTruthy();
    });

    test('clears user state on logout', async () => {
      const initialUser = createMockUser();

      const TestComponent = () => {
        const { logout, user, isAuthenticated } = useAuth();

        return (
          <div>
            <button onClick={logout} data-testid="logout-btn">Logout</button>
            <span data-testid="user-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</span>
          </div>
        );
      };

      const Wrapper = createIntegrationWrapper({ initialAuth: initialUser });
      render(<TestComponent />, { wrapper: Wrapper });

      expect(screen.getByTestId('user-status')).toHaveTextContent('authenticated');

      fireEvent.click(screen.getByTestId('logout-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('user-status')).toHaveTextContent('not-authenticated');
      });

      // Verify localStorage was cleared
      expect(localStorage.getItem('accessToken')).toBeNull();
    });

    test('handles token refresh on 401 response', async () => {
      // Test implementation for automatic token refresh
    });

    test('redirects to login when refresh fails', async () => {
      // Test implementation for failed refresh scenario
    });

    test('persists user across page refresh', () => {
      // Test implementation for persistence
    });

    test('shows verification modal for unverified users', async () => {
      // Test implementation for email verification flow
    });
  });

  describe('Error Handling', () => {
    test('handles network errors gracefully', async () => {
      server.use(
        http.post('/auth/login', () => {
          return HttpResponse.error();
        })
      );

      // Test implementation
    });

    test('handles invalid credentials error', async () => {
      // Test implementation
    });
  });
});
```

#### ToastContext Integration Tests

```typescript
// __tests__/integration/contexts/ToastContext.integration.test.tsx

describe('ToastContext Integration', () => {
  describe('Toast Display Management', () => {
    test('shows success toast with correct styling', () => {
      const TestComponent = () => {
        const { showToast } = useToast();

        return (
          <div>
            <button
              onClick={() => showToast('Success message!', 'success')}
              data-testid="success-btn"
            >
              Show Success
            </button>
            <ToastContainer />
          </div>
        );
      };

      render(<TestComponent />, { wrapper: createIntegrationWrapper() });

      fireEvent.click(screen.getByTestId('success-btn'));

      expect(screen.getByText('Success message!')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveClass('toast-success');
    });

    test('shows error toast with correct styling', () => {
      // Similar test for error toasts
    });

    test('auto-dismisses after configured timeout', async () => {
      const TestComponent = () => {
        const { showToast } = useToast();

        return (
          <div>
            <button
              onClick={() => showToast('Auto dismiss message', 'info', 1000)}
              data-testid="auto-dismiss-btn"
            >
              Show Auto Dismiss
            </button>
            <ToastContainer />
          </div>
        );
      };

      render(<TestComponent />, { wrapper: createIntegrationWrapper() });

      fireEvent.click(screen.getByTestId('auto-dismiss-btn'));

      expect(screen.getByText('Auto dismiss message')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByText('Auto dismiss message')).not.toBeInTheDocument();
      }, { timeout: 1500 });
    });

    test('supports manual dismiss', () => {
      // Test manual dismiss functionality
    });

    test('queues multiple toasts correctly', () => {
      // Test multiple toast management
    });

    test('respects maximum toast count', () => {
      // Test toast count limits
    });
  });
});
```

### 2.2 Component Flow Integration Tests

#### Authentication Flow Tests

```typescript
// __tests__/integration/flows/AuthenticationFlow.test.tsx

describe('Authentication Flow Integration', () => {
  let server: SetupServer;

  beforeAll(() => {
    server = setupServer(...authHandlers, ...aiHandlers);
    server.listen();
  });

  describe('Login Flow', () => {
    test('complete login journey - success path', async () => {
      const mockNavigate = vi.fn();

      // Mock React Router navigate
      vi.mock('react-router-dom', async () => ({
        ...(await vi.importActual('react-router-dom')),
        useNavigate: () => mockNavigate,
      }));

      render(<LoginPage />, {
        wrapper: createIntegrationWrapper(),
        route: '/login'
      });

      // User enters credentials
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'Test123!');

      // User submits form
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      // Verify loading state
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

      // Wait for success
      await waitForLoadingToFinish();

      // Verify redirect to dashboard
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');

      // Verify user is authenticated
      expect(screen.queryByText(/welcome back/i)).toBeInTheDocument();
    });

    test('login flow - invalid credentials', async () => {
      server.use(
        http.post('/auth/login', () => {
          return HttpResponse.json(
            { success: false, message: 'Invalid email or password' },
            { status: 401 }
          );
        })
      );

      render(<LoginPage />, { wrapper: createIntegrationWrapper() });

      await user.type(screen.getByLabelText(/email/i), 'invalid@example.com');
      await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
      });

      // Verify user remains on login page
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    test('login flow - shows verification modal for unverified users', async () => {
      server.use(
        http.post('/auth/login', () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Please verify your email before logging in',
              code: 'EMAIL_NOT_VERIFIED'
            },
            { status: 403 }
          );
        })
      );

      render(<LoginPage />, { wrapper: createIntegrationWrapper() });

      await user.type(screen.getByLabelText(/email/i), 'unverified@example.com');
      await user.type(screen.getByLabelText(/password/i), 'Test123!');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
      });

      // Verify verification modal is shown
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/resend verification/i)).toBeInTheDocument();
    });
  });

  describe('Registration Flow', () => {
    test('complete registration journey', async () => {
      render(<RegisterPage />, { wrapper: createIntegrationWrapper() });

      // Fill registration form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.type(screen.getByLabelText(/^password/i), 'Test123!');
      await user.type(screen.getByLabelText(/confirm password/i), 'Test123!');

      // Accept terms
      await user.click(screen.getByLabelText(/agree to terms/i));

      // Submit form
      await user.click(screen.getByRole('button', { name: /create account/i }));

      await waitForLoadingToFinish();

      // Verify success message and redirect
      expect(screen.getByText(/check your email/i)).toBeInTheDocument();
    });

    test('shows password strength indicator', async () => {
      render(<RegisterPage />, { wrapper: createIntegrationWrapper() });

      const passwordInput = screen.getByLabelText(/^password/i);

      // Weak password
      await user.type(passwordInput, '123');
      expect(screen.getByText(/weak/i)).toBeInTheDocument();

      // Strong password
      await user.clear(passwordInput);
      await user.type(passwordInput, 'StrongPassword123!');
      expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });
  });
});
```

#### Resume Analysis Flow Tests

```typescript
// __tests__/integration/flows/ResumeAnalysisFlow.test.tsx

describe('Resume Analysis Flow Integration', () => {
  let server: SetupServer;

  beforeAll(() => {
    server = setupServer(...aiHandlers);
    server.listen();
  });

  test('complete resume analysis journey', async () => {
    const initialUser = createMockUser();

    render(<HireDeskAnalyzePage />, {
      wrapper: createIntegrationWrapper({ initialAuth: initialUser })
    });

    // Step 1: File Upload
    const fileInput = screen.getByLabelText(/upload resume/i);
    const testFile = mockFileUpload('john-doe-resume.pdf');

    await user.upload(fileInput, testFile);

    // Verify file is displayed
    expect(screen.getByText('john-doe-resume.pdf')).toBeInTheDocument();
    expect(screen.getByText(/pdf/i)).toBeInTheDocument();

    // Step 2: Job Details
    await user.type(screen.getByLabelText(/job title/i), 'Senior Developer');
    await user.type(
      screen.getByLabelText(/job description/i),
      'Looking for experienced React developer with TypeScript skills'
    );

    // Step 3: Submit for Analysis
    await user.click(screen.getByRole('button', { name: /analyze resume/i }));

    // Verify loading state
    expect(screen.getByText(/analyzing resume/i)).toBeInTheDocument();
    expect(screen.getByTestId('analysis-progress')).toBeInTheDocument();

    // Wait for results
    await waitFor(() => {
      expect(screen.getByText(/analysis complete/i)).toBeInTheDocument();
    }, { timeout: 5000 });

    // Verify results are displayed
    expect(screen.getByTestId('personal-info-card')).toBeInTheDocument();
    expect(screen.getByTestId('skills-card')).toBeInTheDocument();
    expect(screen.getByTestId('experience-card')).toBeInTheDocument();
    expect(screen.getByTestId('resume-score')).toBeInTheDocument();

    // Verify specific content
    expect(screen.getByText(/fit status/i)).toBeInTheDocument();
    expect(screen.getByText(/interview questions/i)).toBeInTheDocument();
  });

  test('handles file validation errors', async () => {
    const initialUser = createMockUser();

    render(<HireDeskAnalyzePage />, {
      wrapper: createIntegrationWrapper({ initialAuth: initialUser })
    });

    // Test invalid file format
    const fileInput = screen.getByLabelText(/upload resume/i);
    const invalidFile = new File(['content'], 'resume.txt', { type: 'text/plain' });

    await user.upload(fileInput, invalidFile);

    await waitFor(() => {
      expect(screen.getByText(/invalid file format/i)).toBeInTheDocument();
    });
  });

  test('handles rate limit gracefully', async () => {
    server.use(
      http.post('/hiredesk-analyze', () => {
        return HttpResponse.json(
          {
            detail: 'Daily analysis limit reached',
            current_count: 10,
            limit: 10
          },
          { status: 429 }
        );
      })
    );

    const initialUser = createMockUser();

    render(<HireDeskAnalyzePage />, {
      wrapper: createIntegrationWrapper({ initialAuth: initialUser })
    });

    const fileInput = screen.getByLabelText(/upload resume/i);
    const testFile = mockFileUpload('resume.pdf');

    await user.upload(fileInput, testFile);
    await user.type(screen.getByLabelText(/job title/i), 'Developer');
    await user.type(screen.getByLabelText(/job description/i), 'Job desc');
    await user.click(screen.getByRole('button', { name: /analyze resume/i }));

    await waitFor(() => {
      expect(screen.getByText(/daily analysis limit reached/i)).toBeInTheDocument();
    });

    // Verify rate limit modal is shown
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/upgrade plan/i)).toBeInTheDocument();
  });
});
```

#### Candidate Selection Flow Tests

```typescript
// __tests__/integration/flows/CandidateSelectionFlow.test.tsx

describe('Candidate Selection Flow Integration', () => {
  test('complete candidate evaluation journey', async () => {
    const initialUser = createMockUser();

    render(<SelectionCandidatesPage />, {
      wrapper: createIntegrationWrapper({ initialAuth: initialUser })
    });

    // Step 1: Upload multiple resumes
    const fileInput = screen.getByLabelText(/select resumes/i);
    const testFiles = [
      mockFileUpload('candidate1.pdf'),
      mockFileUpload('candidate2.pdf'),
      mockFileUpload('candidate3.pdf'),
    ];

    await user.upload(fileInput, testFiles);

    // Verify files are listed
    expect(screen.getByText('candidate1.pdf')).toBeInTheDocument();
    expect(screen.getByText('candidate2.pdf')).toBeInTheDocument();
    expect(screen.getByText('candidate3.pdf')).toBeInTheDocument();
    expect(screen.getByText(/3\/5 files selected/i)).toBeInTheDocument();

    // Step 2: Job details
    await user.type(screen.getByLabelText(/job title/i), 'Senior Backend Developer');
    await user.type(
      screen.getByLabelText(/keywords/i),
      'Python, AWS, Docker, PostgreSQL, Leadership'
    );

    // Step 3: Submit for evaluation
    await user.click(screen.getByRole('button', { name: /evaluate candidates/i }));

    // Verify loading state
    expect(screen.getByText(/evaluating candidates/i)).toBeInTheDocument();

    // Wait for results
    await waitFor(() => {
      expect(screen.getByText(/evaluation results/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // Verify results display
    expect(screen.getByTestId('summary-stats')).toBeInTheDocument();
    expect(screen.getByText(/2 fit/i)).toBeInTheDocument();
    expect(screen.getByText(/1 reject/i)).toBeInTheDocument();

    // Verify individual results
    expect(screen.getAllByText(/fit|reject/i)).toHaveLength(6); // 3 candidates + 3 badges
    expect(screen.getByText(/next steps/i)).toBeInTheDocument();
  });
});
```

### 2.3 Protected Route Integration Tests

```typescript
// __tests__/integration/components/auth/ProtectedRoute.test.tsx

describe('ProtectedRoute Integration', () => {
  test('redirects unauthenticated users to login', () => {
    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', async () => ({
      ...(await vi.importActual('react-router-dom')),
      useNavigate: () => mockNavigate,
    }));

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      { wrapper: createIntegrationWrapper() }
    );

    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { from: window.location }
    });
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  test('allows authenticated users to access content', () => {
    const initialUser = createMockUser();

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      { wrapper: createIntegrationWrapper({ initialAuth: initialUser }) }
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });
});
```

### 2.4 MSW API Mocking Infrastructure

#### Complete Mock Handlers Setup

```typescript
// __tests__/mocks/handlers/auth.handlers.ts

export const authHandlers = [
  http.post(`${API_AUTH_URL}/auth/login`, async ({ request }) => {
    const body = await request.json();

    if (body.email === "test@example.com" && body.password === "Test123!") {
      return HttpResponse.json({
        success: true,
        data: {
          accessToken: "mock-access-token",
          user: createMockUser(),
        },
      });
    }

    if (body.email === "unverified@example.com") {
      return HttpResponse.json(
        {
          success: false,
          message: "Please verify your email before logging in",
          code: "EMAIL_NOT_VERIFIED",
        },
        { status: 403 }
      );
    }

    return HttpResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }),

  http.post(`${API_AUTH_URL}/auth/register`, async ({ request }) => {
    const body = await request.json();

    if (body.email === "existing@example.com") {
      return HttpResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    return HttpResponse.json({
      success: true,
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  }),

  http.post(`${API_AUTH_URL}/auth/logout`, () => {
    return HttpResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  }),

  http.get(`${API_AUTH_URL}/auth/profile`, ({ request }) => {
    const token = request.headers.get("Authorization");

    if (!token || token !== "Bearer mock-access-token") {
      return HttpResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: createMockUser(),
    });
  }),
];

// __tests__/mocks/handlers/ai.handlers.ts

export const aiHandlers = [
  http.post(`${AI_API}/hiredesk-analyze`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file");
    const jobTitle = formData.get("target_role");

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate processing time

    if (!file) {
      return HttpResponse.json(
        { success: false, message: "No file provided" },
        { status: 422 }
      );
    }

    // Check file type
    if (
      !(file as File).type.includes("pdf") &&
      !(file as File).type.includes("word")
    ) {
      return HttpResponse.json(
        {
          success: false,
          message: "Invalid file format. Only PDF and DOCX are supported.",
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      success: true,
      fit_status: "fit",
      reasoning: `Strong match for ${jobTitle} position`,
      best_fit_role: jobTitle,
      resumeData: createMockResumeData(),
      roleRecommendations: createMockRoleRecommendations(),
      questions: createMockInterviewQuestions(),
      resumeScore: createMockResumeScore(),
      personalityInsights: createMockPersonalityInsights(),
      careerPath: createMockCareerPath(),
    });
  }),

  http.post(`${AI_API}/selection-candidate`, async ({ request }) => {
    const formData = await request.formData();
    const files = formData.getAll("files");
    const jobTitle = formData.get("job_title");
    const keywords = formData.get("keywords");

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing time

    if (files.length === 0) {
      return HttpResponse.json(
        { success: false, message: "At least 1 resume is required" },
        { status: 422 }
      );
    }

    if (files.length > 5) {
      return HttpResponse.json(
        { success: false, message: "Maximum 5 resumes allowed" },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      job_title: jobTitle,
      keywords: keywords?.split(",").map((k) => k.trim()),
      total_candidates: files.length,
      fit_count: Math.ceil(files.length * 0.6),
      reject_count: Math.floor(files.length * 0.4),
      results: files.map((file, index) => ({
        candidate: (file as File).name,
        status: index < Math.ceil(files.length * 0.6) ? "FIT" : "REJECT",
        message:
          index < Math.ceil(files.length * 0.6)
            ? "Strong match - has required skills and experience"
            : "Missing key skills or insufficient experience",
      })),
    });
  }),

  // Rate limiting handler
  http.post(`${AI_API}/*`, ({ request }) => {
    const rateLimitHeader = request.headers.get("X-Rate-Limit-Remaining");

    if (rateLimitHeader === "0") {
      return HttpResponse.json(
        {
          detail: "Daily analysis limit reached. Current: 10, Limit: 10",
          current_count: 10,
          limit: 10,
        },
        { status: 429 }
      );
    }

    // Default pass-through
    return;
  }),
];
```

#### Mock Data Generators

```typescript
// __tests__/mocks/data/mockUsers.ts

export const createMockUser = (overrides = {}) => ({
  id: "user-123",
  name: "John Doe",
  email: "john@example.com",
  company_name: "Test Corp",
  filesUploaded: 5,
  emailVerified: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

// __tests__/mocks/data/mockAnalysis.ts

export const createMockResumeData = () => ({
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
  workExperience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      duration: "2020 - Present",
      description: ["Led development of core platform features"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      year: "2018",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
  highlights: [
    "Full-stack development",
    "Team leadership",
    "Cloud architecture",
  ],
});

export const createMockResumeScore = () => ({
  overall_score: 85,
  technical_score: 90,
  experience_score: 88,
  education_score: 80,
  communication_score: 85,
  reasoning: "Strong technical background with relevant experience",
  strengths: ["Strong technical skills", "Leadership experience"],
  weaknesses: ["Could improve cloud architecture knowledge"],
  improvement_suggestions: [
    "Consider AWS certification",
    "Gain more system design experience",
  ],
});
```

---

## 📊 Phase 2 Success Metrics & KPIs

### Coverage Targets

- **Integration Test Coverage**: 70%+ of critical user flows
- **Component Integration**: 80%+ of React components with context interaction
- **API Integration**: 100% of service methods with MSW mocking

### Quality Metrics

- **Test Reliability**: 0% flaky tests
- **Execution Time**: < 45 seconds for full integration suite
- **Mock Accuracy**: MSW responses match production API 95%+

### Functional Coverage

- ✅ **Authentication Flows**: Login, Register, Logout, Password Reset (8 scenarios)
- ✅ **Resume Analysis Flows**: Upload, Analysis, Results Display (6 scenarios)
- ✅ **Batch Processing**: Multi-file upload and processing (4 scenarios)
- ✅ **Candidate Selection**: Evaluation and results (5 scenarios)
- ✅ **Error Handling**: Network errors, validation, rate limits (10 scenarios)
- ✅ **Context Integration**: Auth and Toast contexts (15 scenarios)

### Test Performance

- **Average Test Time**: < 2 seconds per test
- **Setup/Teardown**: < 100ms per test
- **Memory Usage**: < 50MB for full suite
- **Parallel Execution**: Support for 4+ parallel workers

---

## 🔄 Phase 2 → Phase 3 Transition

### Deliverables for Phase 3

1. **Complete MSW Handler Library** - Ready for E2E testing
2. **Integration Test Suite** - 35+ integration tests covering all flows
3. **Test Data Generators** - Reusable mock data for E2E tests
4. **Error Scenario Coverage** - Comprehensive error handling validation

### Next Phase Preview

**Phase 3: End-to-End Testing** will leverage the MSW infrastructure and test patterns established in Phase 2 to create comprehensive user journey tests with Playwright.

---

## Phase 3: End-to-End Testing (Weeks 7-9)

### Goals

- Validate complete user journeys
- Test cross-browser compatibility
- Verify production-like scenarios
- Setup E2E test infrastructure

### 3.1 E2E Testing Infrastructure

#### Tool Selection: Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

#### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./__tests__/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["json", { outputFile: "test-results/results.json" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

### 3.2 Critical E2E Test Scenarios

#### User Registration & Verification Journey

```typescript
// __tests__/e2e/auth/registration.spec.ts

test.describe("User Registration Journey", () => {
  test("Complete registration flow", async ({ page }) => {
    // Step 1: Navigate to signup
    await page.goto("/signup");
    await expect(page).toHaveTitle(/Sign Up/);

    // Step 2: Fill registration form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="company_name"]', "Test Corp");
    await page.fill('input[name="password"]', "SecurePass123!");
    await page.fill('input[name="confirmPassword"]', "SecurePass123!");

    // Step 3: Accept terms
    await page.check('input[type="checkbox"]');

    // Step 4: Submit form
    await page.click('button[type="submit"]');

    // Step 5: Verify redirect to verification page
    await expect(page).toHaveURL(/verify-email/);
    await expect(page.locator("text=Check your email")).toBeVisible();
  });
});
```

#### Resume Analysis Complete Journey

```typescript
// __tests__/e2e/resume/analysis.spec.ts

test.describe("Resume Analysis Journey", () => {
  test("Upload and analyze resume", async ({ page }) => {
    // Step 1: Login
    await page.goto("/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "Test123!");
    await page.click('button[type="submit"]');

    // Step 2: Navigate to analysis page
    await page.goto("/hiredesk-analyze");
    await expect(page).toHaveTitle(/Resume Analysis/);

    // Step 3: Upload resume
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles("./fixtures/sample-resume.pdf");

    // Step 4: Fill job details
    await page.fill('input[name="targetRole"]', "Senior Developer");
    await page.fill('textarea[name="jobDescription"]', "Python, AWS, Docker");

    // Step 5: Submit analysis
    await page.click('button:has-text("Analyze Resume")');

    // Step 6: Wait for results
    await expect(page.locator("text=Analysis Results")).toBeVisible({
      timeout: 30000,
    });

    // Step 7: Verify results sections
    await expect(page.locator("text=Personal Information")).toBeVisible();
    await expect(page.locator("text=Skills")).toBeVisible();
    await expect(page.locator("text=Work Experience")).toBeVisible();

    // Step 8: Verify persistence (refresh page)
    await page.reload();
    await expect(page.locator("text=Analysis Results")).toBeVisible();
  });

  test("Handle rate limiting", async ({ page }) => {
    // Simulate exceeding rate limit
    // Upload multiple files to trigger rate limit
    // Verify rate limit modal appears
    // Verify appropriate error message
  });
});
```

#### Batch Analysis Journey

```typescript
// __tests__/e2e/batch/batch-analysis.spec.ts

test.describe("Batch Analysis Journey", () => {
  test("Upload and analyze multiple resumes", async ({ page }) => {
    // Step 1: Login
    await page.goto("/login");
    await loginUser(page);

    // Step 2: Navigate to batch analysis
    await page.goto("/batch-analyze");

    // Step 3: Upload 3 resumes
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      "./fixtures/resume1.pdf",
      "./fixtures/resume2.pdf",
      "./fixtures/resume3.pdf",
    ]);

    // Step 4: Verify file list
    await expect(page.locator("text=3 files selected")).toBeVisible();

    // Step 5: Submit batch
    await page.click('button:has-text("Analyze Batch")');

    // Step 6: Wait for results
    await expect(page.locator("text=Batch Results")).toBeVisible({
      timeout: 45000,
    });

    // Step 7: Verify results for all candidates
    await expect(page.locator('[data-testid="batch-result-card"]')).toHaveCount(
      3
    );

    // Step 8: Test result expansion
    await page.click('[data-testid="expand-candidate-0"]');
    await expect(
      page.locator('[data-testid="candidate-details-0"]')
    ).toBeVisible();
  });
});
```

#### Candidate Selection Journey

```typescript
// __tests__/e2e/selection/candidate-selection.spec.ts

test.describe("Candidate Selection Journey", () => {
  test("Evaluate candidates with FIT/REJECT decisions", async ({ page }) => {
    // Step 1: Login
    await loginUser(page);

    // Step 2: Navigate to selection page
    await page.goto("/selection-candidates");

    // Step 3: Upload resumes
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      "./fixtures/resume1.pdf",
      "./fixtures/resume2.pdf",
    ]);

    // Step 4: Enter job details
    await page.fill('input[name="jobTitle"]', "Senior Backend Developer");
    await page.fill(
      'textarea[name="keywords"]',
      "Python, AWS, Docker, PostgreSQL"
    );

    // Step 5: Submit evaluation
    await page.click('button:has-text("Evaluate Candidates")');

    // Step 6: Wait for results
    await expect(page.locator("text=Evaluation Results")).toBeVisible({
      timeout: 30000,
    });

    // Step 7: Verify FIT/REJECT badges
    await expect(page.locator('[data-status="FIT"]')).toHaveCount(1);
    await expect(page.locator('[data-status="REJECT"]')).toHaveCount(1);

    // Step 8: Verify summary stats
    await expect(page.locator("text=1 FIT")).toBeVisible();
    await expect(page.locator("text=1 REJECT")).toBeVisible();
  });
});
```

### 3.3 Cross-Browser Testing

#### Browser Matrix

- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop)

### 3.4 Accessibility Testing

```typescript
// __tests__/e2e/accessibility/a11y.spec.ts
import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test.describe("Accessibility Tests", () => {
  test("Home page is accessible", async ({ page }) => {
    await page.goto("/");
    await injectAxe(page);
    await checkA11y(page);
  });

  test("Login page is accessible", async ({ page }) => {
    await page.goto("/login");
    await injectAxe(page);
    await checkA11y(page);
  });

  test("Keyboard navigation works", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    // Verify navigation occurred
  });
});
```

### Phase 3 Success Metrics

- ✅ 100% critical user flows covered
- ✅ Tests pass on Chrome, Firefox, Safari
- ✅ Mobile responsive tests pass
- ✅ WCAG 2.1 AA compliance verified
- ✅ E2E test execution time < 10 minutes

---

## Phase 4: API Contract Testing (Weeks 10-11)

### Goals

- Validate API contract compliance
- Test API error scenarios
- Monitor API response times
- Setup contract testing framework

### 4.1 Pact Contract Testing

#### Setup Pact

```bash
npm install -D @pact-foundation/pact
```

#### Consumer Contract Tests

```typescript
// __tests__/contract/auth-api.pact.test.ts
import { PactV3, MatchersV3 } from "@pact-foundation/pact";

const provider = new PactV3({
  consumer: "hiredesk-frontend",
  provider: "jobpsych-auth-api",
});

describe("Auth API Contract", () => {
  it("login with valid credentials", () => {
    provider
      .given("user exists with email test@example.com")
      .uponReceiving("a login request with valid credentials")
      .withRequest({
        method: "POST",
        path: "/api/auth/login",
        headers: { "Content-Type": "application/json" },
        body: {
          email: "test@example.com",
          password: "Test123!",
        },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
          success: true,
          data: {
            accessToken: MatchersV3.string("mock-token"),
            user: {
              id: MatchersV3.string("user-123"),
              email: MatchersV3.string("test@example.com"),
              name: MatchersV3.string("Test User"),
            },
          },
        },
      });

    return provider.executeTest(async (mockServer) => {
      const result = await authService.login({
        email: "test@example.com",
        password: "Test123!",
      });

      expect(result.accessToken).toBeDefined();
      expect(result.user.email).toBe("test@example.com");
    });
  });

  it("returns 401 for invalid credentials", () => {
    // Test contract for error scenario
  });

  it("returns 403 for unverified email", () => {
    // Test contract for unverified user
  });
});
```

#### AI API Contract Tests

```typescript
// __tests__/contract/ai-api.pact.test.ts

describe("AI API Contract", () => {
  it("analyzes resume successfully", () => {
    // Test /hiredesk-analyze contract
  });

  it("returns 429 when rate limit exceeded", () => {
    // Test rate limiting contract
  });

  it("batch analyzes 2-5 resumes", () => {
    // Test /batch-analyze contract
  });

  it("evaluates candidates with FIT/REJECT", () => {
    // Test /selection-candidate contract
  });
});
```

### 4.2 API Performance Testing

#### Response Time Benchmarks

```typescript
// __tests__/performance/api-benchmarks.test.ts

describe("API Performance Benchmarks", () => {
  test("login response time < 500ms", async () => {
    const start = Date.now();
    await authService.login({
      email: "test@example.com",
      password: "Test123!",
    });
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500);
  });

  test("resume analysis response time < 20s", async () => {
    const start = Date.now();
    await aiService.hireDeskAnalyze(mockFile, "Developer", "Python AWS");
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(20000);
  });

  test("batch analysis response time < 30s for 5 files", async () => {
    const start = Date.now();
    await aiService.batchAnalyze(mockFiles);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(30000);
  });
});
```

### Phase 4 Success Metrics

- ✅ All API endpoints have contract tests
- ✅ Contract tests pass in CI/CD
- ✅ API response times meet benchmarks
- ✅ Error scenarios validated

---

## Phase 5: Performance & Load Testing (Weeks 12-13)

### Goals

- Validate frontend performance
- Load testing for API endpoints
- Optimize bundle size
- Lighthouse score > 90

### 5.1 Frontend Performance Testing

#### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

#### Bundle Size Analysis

```bash
npm install -D vite-plugin-bundle-analyzer

# Add to vite.config.ts
import { visualizer } from 'vite-plugin-bundle-analyzer';

plugins: [
  visualizer({ open: true }),
]
```

### 5.2 Load Testing with k6

```javascript
// __tests__/load/resume-analysis.load.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 10 }, // Ramp up to 10 users
    { duration: "5m", target: 10 }, // Stay at 10 users
    { duration: "2m", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% of requests under 2s
    http_req_failed: ["rate<0.01"], // < 1% failure rate
  },
};

export default function () {
  const url = "https://jobpsych-ai.vercel.app/api/hiredesk-analyze";
  const formData = {
    file: http.file(open("./fixtures/resume.pdf"), "resume.pdf"),
    target_role: "Senior Developer",
    job_description: "Python, AWS, Docker",
  };

  const response = http.post(url, formData, {
    headers: {
      Authorization: `Bearer ${__ENV.TEST_TOKEN}`,
    },
  });

  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time < 20s": (r) => r.timings.duration < 20000,
  });

  sleep(1);
}
```

### 5.3 Performance Optimization Checklist

- [ ] Code splitting implemented
- [ ] Lazy loading for routes
- [ ] Image optimization
- [ ] Tree shaking enabled
- [ ] Minification enabled
- [ ] Gzip compression
- [ ] CDN for static assets
- [ ] Service worker for caching

### Phase 5 Success Metrics

- ✅ Lighthouse score > 90
- ✅ Bundle size < 500KB (gzipped)
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Load tests show < 1% error rate

---

## Phase 6: Security Testing (Week 14)

### Goals

- Validate authentication security
- Test authorization controls
- Check for XSS/CSRF vulnerabilities
- Validate data sanitization

### 6.1 Security Test Cases

#### Authentication Security Tests

```typescript
// __tests__/security/auth-security.test.ts

describe('Authentication Security', () => {
  test('prevents SQL injection in login', async () => {
    const maliciousInput = "admin' OR '1'='1";
    await expect(
      authService.login({ email: maliciousInput, password: 'test' })
    ).rejects.toThrow();
  });

  test('prevents XSS in input fields', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    const { container } = render(<LoginForm />);
    const input = screen.getByLabelText(/email/i);

    fireEvent.change(input, { target: { value: xssPayload } });

    expect(container.innerHTML).not.toContain('<script>');
  });

  test('JWT tokens expire correctly', async () => {
    // Mock expired token scenario
    localStorage.setItem('accessToken', 'expired-token');

    await expect(authService.getProfile()).rejects.toThrow();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  test('sensitive data not exposed in console', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');

    authService.login({ email: 'test@example.com', password: 'SecurePass123!' });

    const logs = consoleLogSpy.mock.calls.flat().join('');
    expect(logs).not.toContain('SecurePass123!');
  });
});
```

#### Authorization Tests

```typescript
// __tests__/security/authorization.test.ts

describe("Authorization Tests", () => {
  test("unauthenticated users cannot access protected routes", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/login/);
  });

  test("cannot access other user data", async () => {
    // Try to fetch another user's profile
    // Verify 403 response
  });

  test("rate limiting enforced", async () => {
    // Make 11 selection-candidate requests
    // Verify 429 on 11th request
  });
});
```

#### Data Security Tests

```typescript
describe("Data Security", () => {
  test("passwords are never logged", () => {
    // Monitor console/network for password exposure
  });

  test("sensitive data cleared on logout", () => {
    authService.logout();
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(sessionStorage.getItem("user")).toBeNull();
  });

  test("session expires after inactivity", () => {
    // Test session timeout logic
  });
});
```

### 6.2 OWASP Top 10 Checklist

- [ ] A01: Broken Access Control
- [ ] A02: Cryptographic Failures
- [ ] A03: Injection
- [ ] A04: Insecure Design
- [ ] A05: Security Misconfiguration
- [ ] A06: Vulnerable Components
- [ ] A07: Authentication Failures
- [ ] A08: Data Integrity Failures
- [ ] A09: Logging Failures
- [ ] A10: SSRF

### Phase 6 Success Metrics

- ✅ No critical security vulnerabilities
- ✅ Authentication/authorization tests pass
- ✅ XSS/CSRF protections verified
- ✅ Sensitive data handling validated

---

## Phase 7: Monitoring & Maintenance (Ongoing)

### Goals

- Setup error tracking
- Monitor test health
- Continuous test improvement
- Regression prevention

### 7.1 Error Tracking Setup

#### Sentry Integration

```typescript
// app/root.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
});
```

### 7.2 Test Health Monitoring

#### Metrics to Track

- Test execution time trends
- Flaky test detection
- Coverage trends
- Failure rate over time

#### Flaky Test Detection

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    retry: 2, // Retry flaky tests
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
```

### 7.3 Continuous Improvement

#### Monthly Test Review

- Review test coverage reports
- Identify gaps in test coverage
- Refactor slow/flaky tests
- Update test data/fixtures
- Review and update documentation

#### Quarterly Test Audit

- Security testing update
- Performance benchmark review
- Browser compatibility check
- Accessibility compliance revalidation

---

## 📊 Test Metrics & KPIs

### Coverage Targets

| Metric                        | Target | Current |
| ----------------------------- | ------ | ------- |
| Unit Test Coverage            | 80%+   | ~15%    |
| Integration Coverage          | 70%+   | ~5%     |
| E2E Coverage (Critical Flows) | 100%   | 0%      |
| API Contract Tests            | 100%   | 0%      |
| Code Quality (Lighthouse)     | 90+    | TBD     |

### Quality Gates (CI/CD)

- ✅ All tests pass
- ✅ Coverage threshold met (80%)
- ✅ No high/critical security vulnerabilities
- ✅ Lighthouse score > 90
- ✅ Bundle size < 500KB
- ✅ TypeScript compilation succeeds
- ✅ Linting passes

---

## 🛠️ Testing Tools & Technologies

### Testing Framework

- **Unit/Integration:** Vitest 3.2.4
- **Component Testing:** React Testing Library 16.3.0
- **E2E Testing:** Playwright
- **API Mocking:** MSW (Mock Service Worker) 2.11.3
- **Contract Testing:** Pact
- **Load Testing:** k6
- **Performance:** Lighthouse CI
- **Security:** OWASP ZAP (optional)

### CI/CD

- **Platform:** GitHub Actions
- **Coverage:** Codecov
- **Error Tracking:** Sentry

---

## 📁 Test Directory Structure

```
hiredesk/
├── __tests__/
│   ├── e2e/                    # End-to-end tests (Playwright)
│   │   ├── auth/
│   │   │   ├── login.spec.ts
│   │   │   ├── registration.spec.ts
│   │   │   └── password-reset.spec.ts
│   │   ├── resume/
│   │   │   └── analysis.spec.ts
│   │   ├── batch/
│   │   │   └── batch-analysis.spec.ts
│   │   ├── selection/
│   │   │   └── candidate-selection.spec.ts
│   │   └── accessibility/
│   │       └── a11y.spec.ts
│   ├── integration/            # Integration tests
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── resume/
│   │   │   └── batch/
│   │   ├── contexts/
│   │   │   ├── AuthContext.test.tsx
│   │   │   └── ToastContext.test.tsx
│   │   └── routes/
│   │       └── SelectionCandidates.test.tsx
│   ├── unit/                   # Unit tests
│   │   ├── services/
│   │   │   ├── authService.test.ts
│   │   │   ├── aiService.test.ts
│   │   │   └── fileService.test.ts
│   │   ├── utils/
│   │   │   ├── errorHandler.test.ts
│   │   │   └── api.test.ts
│   │   └── hooks/
│   │       ├── useForm.test.ts
│   │       └── useToastHelpers.test.ts
│   ├── contract/               # API contract tests (Pact)
│   │   ├── auth-api.pact.test.ts
│   │   └── ai-api.pact.test.ts
│   ├── performance/            # Performance tests
│   │   ├── api-benchmarks.test.ts
│   │   └── bundle-size.test.ts
│   ├── security/               # Security tests
│   │   ├── auth-security.test.ts
│   │   └── authorization.test.ts
│   ├── load/                   # Load tests (k6)
│   │   └── resume-analysis.load.js
│   ├── fixtures/               # Test data
│   │   ├── sample-resume.pdf
│   │   ├── resume1.pdf
│   │   └── userFactory.ts
│   ├── mocks/                  # MSW handlers
│   │   ├── handlers.ts
│   │   └── server.ts
│   ├── setup/                  # Test setup files
│   │   ├── test-setup.ts
│   │   ├── jsdom-setup.ts
│   │   └── react-testing-library.ts
│   └── utils/                  # Test utilities
│       └── test-helpers.ts
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── e2e.yml
│       └── lighthouse.yml
├── playwright.config.ts
├── vitest.config.ts
└── package.json
```

---

## 🚀 Getting Started - Quick Commands

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui

# Run E2E tests (requires Playwright)
npx playwright test

# Run E2E tests with UI
npx playwright test --ui

# Run specific test file
npm run test -- fileService.test.ts

# Run load tests (requires k6)
k6 run __tests__/load/resume-analysis.load.js

# Generate coverage report
npm run test:coverage && open coverage/index.html
```

---

## 📚 Testing Standards & Best Practices

### Test Naming Convention

```typescript
// Good
test("should return user profile when authenticated");
test("handles 429 rate limit error gracefully");

// Bad
test("test1");
test("works");
```

### Test Structure (AAA Pattern)

```typescript
test("should login successfully", async () => {
  // Arrange
  const credentials = { email: "test@example.com", password: "Test123!" };
  mockPost.mockResolvedValueOnce({ data: mockUserData });

  // Act
  const result = await authService.login(credentials);

  // Assert
  expect(result.user.email).toBe("test@example.com");
  expect(localStorage.getItem("accessToken")).toBeDefined();
});
```

### Mock Data Best Practices

- Use factories for consistent test data
- Keep fixtures in dedicated directory
- Use realistic data that matches production
- Don't hardcode IDs - use generators

### Test Isolation

- Each test should be independent
- Clean up after tests (localStorage, sessionStorage)
- Reset mocks between tests
- Use `beforeEach` and `afterEach` hooks

---

## 🎯 Success Criteria

### Phase Completion Criteria

#### Phase 1 Complete When:

- [x] Vitest configured
- [ ] 80%+ unit test coverage achieved
- [ ] All services have test suites
- [ ] CI/CD pipeline integrated
- [ ] Test documentation complete

#### Phase 2 Complete When:

- [ ] 70%+ integration test coverage
- [ ] All contexts tested
- [ ] Critical component flows tested
- [ ] MSW handlers complete

#### Phase 3 Complete When:

- [ ] E2E tests for all critical flows
- [ ] Cross-browser tests pass
- [ ] Accessibility tests pass
- [ ] Mobile responsive tests pass

#### Phase 4 Complete When:

- [ ] Contract tests for all APIs
- [ ] Performance benchmarks established
- [ ] API error scenarios validated

#### Phase 5 Complete When:

- [ ] Lighthouse score > 90
- [ ] Bundle optimized < 500KB
- [ ] Load tests pass
- [ ] Performance optimizations applied

#### Phase 6 Complete When:

- [ ] Security tests pass
- [ ] OWASP Top 10 validated
- [ ] No critical vulnerabilities

#### Phase 7 Complete When:

- [ ] Monitoring setup complete
- [ ] Test health dashboard active
- [ ] Maintenance schedule established

---

## 📅 Timeline Summary

| Phase   | Duration    | Focus                     |
| ------- | ----------- | ------------------------- |
| Phase 1 | Weeks 1-3   | Unit Testing & Foundation |
| Phase 2 | Weeks 4-6   | Integration Testing       |
| Phase 3 | Weeks 7-9   | E2E Testing               |
| Phase 4 | Weeks 10-11 | API Contract Testing      |
| Phase 5 | Weeks 12-13 | Performance Testing       |
| Phase 6 | Week 14     | Security Testing          |
| Phase 7 | Ongoing     | Monitoring & Maintenance  |

**Total Initial Implementation:** ~14 weeks (3.5 months)  
**Ongoing Maintenance:** Continuous

---

## 🤝 Team Responsibilities

### SDET/QA Engineers

- Write and maintain test suites
- Setup test infrastructure
- Review test coverage
- Conduct test audits
- Monitor test health

### Frontend Developers

- Write unit tests for new features
- Ensure testability of components
- Fix failing tests
- Participate in test reviews

### DevOps Engineers

- Setup CI/CD pipelines
- Configure test environments
- Monitor test performance
- Setup error tracking

---

## 📞 Support & Resources

### Documentation

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)

### Internal Resources

- Test Writing Guidelines: `docs/testing-guidelines.md`
- Code Review Checklist: `docs/code-review.md`
- CI/CD Documentation: `.github/workflows/README.md`

---

## 🔄 Version History

| Version | Date         | Changes                  |
| ------- | ------------ | ------------------------ |
| 1.0.0   | Oct 30, 2025 | Initial roadmap creation |

---

## ✅ Next Steps

1. **Review & Approve Roadmap** - Stakeholder sign-off
2. **Setup Phase 1 Infrastructure** - Test framework configuration
3. **Create Test Plan Templates** - Standardize test documentation
4. **Kick-off Meeting** - Align team on testing strategy
5. **Begin Phase 1 Implementation** - Start unit testing

---

**Document Owner:** SDET Team  
**Last Updated:** October 30, 2025  
**Status:** Draft - Awaiting Approval

---

## 📝 Appendix

### A. Test Data Requirements

- Sample resumes (PDF, DOCX formats)
- Test user accounts (various states)
- Mock API responses
- Rate limit test scenarios

### B. Environment Setup

```bash
# Clone repository
git clone https://github.com/Rafiqdevhub/HireDesk.git
cd hiredesk

# Install dependencies
npm install

# Setup test environment
cp .env.example .env.test

# Run tests
npm run test
```

### C. Glossary

- **AAA:** Arrange, Act, Assert
- **CI/CD:** Continuous Integration/Continuous Deployment
- **E2E:** End-to-End
- **MSW:** Mock Service Worker
- **WCAG:** Web Content Accessibility Guidelines
- **XSS:** Cross-Site Scripting
- **CSRF:** Cross-Site Request Forgery

---

**END OF ROADMAP**
