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

## Phase 2: Integration Testing (Weeks 4-6)

### Goals

- Test component integration
- Validate context providers
- Test API integration flows
- Mock external API responses

### 2.1 Context Provider Tests (Priority: HIGH)

#### AuthContext Integration Tests

```typescript
// __tests__/integration/contexts/AuthContext.test.tsx

describe('AuthContext Integration', () => {
  ✓ Initializes with null user when not authenticated
  ✓ Loads user from localStorage on mount
  ✓ Updates user state on successful login
  ✓ Clears user state on logout
  ✓ Handles token refresh on 401
  ✓ Redirects to login when refresh fails
  ✓ Persists user across page refresh
  ✓ Shows verification modal for unverified users
});
```

#### ToastContext Integration Tests

```typescript
// __tests__/integration/contexts/ToastContext.test.tsx

describe('ToastContext Integration', () => {
  ✓ Shows success toast
  ✓ Shows error toast
  ✓ Shows warning toast
  ✓ Auto-dismisses after timeout
  ✓ Supports manual dismiss
  ✓ Queues multiple toasts
  ✓ Respects max toast count
});
```

### 2.2 Component Integration Tests

#### Authentication Flow Tests

```typescript
// __tests__/integration/components/auth/LoginFlow.test.tsx

describe('Login Flow Integration', () => {
  ✓ User can login with valid credentials
  ✓ Shows error for invalid credentials
  ✓ Redirects to dashboard after successful login
  ✓ Shows verification modal for unverified email
  ✓ Handles "Remember Me" functionality
  ✓ Shows forgot password link
  ✓ Validates email format
  ✓ Validates password requirements
});

// __tests__/integration/components/auth/RegisterFlow.test.tsx
describe('Registration Flow Integration', () => {
  ✓ User can register with valid data
  ✓ Shows password strength indicator
  ✓ Validates password confirmation match
  ✓ Handles duplicate email error
  ✓ Shows terms and privacy policy modals
  ✓ Requires terms acceptance
  ✓ Sends verification email
  ✓ Redirects to verification page
});
```

#### Resume Analysis Flow Tests

```typescript
// __tests__/integration/components/resume/ResumeAnalysisFlow.test.tsx

describe('Resume Analysis Flow Integration', () => {
  ✓ User can upload resume file
  ✓ Validates file format (PDF, DOCX)
  ✓ Validates file size (< 10MB)
  ✓ Shows file preview after selection
  ✓ User can enter job title
  ✓ User can enter job description
  ✓ Submits form with valid data
  ✓ Shows loading state during analysis
  ✓ Displays analysis results
  ✓ Persists results across page refresh
  ✓ Handles rate limit error (429)
  ✓ Handles file format error (422)
  ✓ Shows rate limit modal
});
```

#### Batch Analysis Flow Tests

```typescript
// __tests__/integration/components/batch/BatchAnalysisFlow.test.tsx

describe('Batch Analysis Flow Integration', () => {
  ✓ User can upload 2-5 files
  ✓ Shows file count validation
  ✓ Displays all selected files
  ✓ User can remove files
  ✓ Validates total file count
  ✓ Submits batch for analysis
  ✓ Shows progress indicator
  ✓ Displays results for each candidate
  ✓ Shows summary statistics
  ✓ Handles rate limiting
  ✓ Persists batch results
});
```

#### Candidate Selection Flow Tests

```typescript
// __tests__/integration/routes/SelectionCandidates.test.tsx

describe('Candidate Selection Flow Integration', () => {
  ✓ User can upload 1-5 resumes
  ✓ User enters job title
  ✓ User enters required keywords
  ✓ Validates all required fields
  ✓ Submits for evaluation
  ✓ Displays FIT/REJECT results
  ✓ Shows decision reasoning
  ✓ Displays summary stats (fit count, reject count)
  ✓ Handles rate limiting (10/day quota)
  ✓ Persists evaluation results
  ✓ Shows rate limit modal
});
```

### 2.3 Protected Route Testing

```typescript
// __tests__/integration/components/auth/ProtectedRoute.test.tsx

describe('ProtectedRoute Integration', () => {
  ✓ Redirects unauthenticated users to login
  ✓ Allows authenticated users to access route
  ✓ Preserves intended destination in redirect
  ✓ Checks token validity before rendering
  ✓ Handles expired token scenario
});
```

### 2.4 MSW API Mocking

#### Setup Mock Handlers

```typescript
// __tests__/mocks/handlers.ts

export const handlers = [
  // Auth API handlers
  http.post(`${API_AUTH_URL}/auth/login`, async ({ request }) => {
    const body = await request.json();
    if (body.email === "test@example.com" && body.password === "Test123!") {
      return HttpResponse.json({
        success: true,
        data: {
          accessToken: "mock-token",
          user: createMockUser(),
        },
      });
    }
    return HttpResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // AI API handlers
  http.post(`${AI_API}/hiredesk-analyze`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return HttpResponse.json(
        { success: false, message: "No file provided" },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: createMockAnalysisResult(),
    });
  }),

  // Rate limiting mock
  http.post(`${AI_API}/selection-candidate`, async ({ request }) => {
    const userCount = request.headers.get("X-User-Count");
    if (parseInt(userCount || "0") >= 10) {
      return HttpResponse.json(
        {
          detail: "User exceeded selected_candidate limit",
          status_code: 429,
        },
        { status: 429 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: createMockSelectionResult(),
    });
  }),
];
```

### Phase 2 Success Metrics

- ✅ 70%+ integration test coverage
- ✅ All critical user flows tested
- ✅ All context providers have integration tests
- ✅ MSW handlers for all API endpoints
- ✅ Integration tests pass reliably

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
