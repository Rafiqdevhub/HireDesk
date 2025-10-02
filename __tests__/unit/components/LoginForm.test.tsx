import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "../../../app/contexts/AuthContext";
import Login from "../../../app/routes/login";

// Mock the auth context
const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../../app/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login Form Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test("renders login form correctly", () => {
    renderLogin();

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(
      screen.getByText("Sign in to your HireDesk account")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("validates email field - required", async () => {
    const user = userEvent.setup();
    renderLogin();

    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.click(submitButton);

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  test("validates email field - invalid format", async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  });

  test("validates password field - required", async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("validates password field - minimum length", async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "12345");
    await user.click(submitButton);

    expect(
      screen.getByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });

  test("clears email error when user types", async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Submit with empty email to trigger error
    await user.click(submitButton);
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    // Type in email field
    await user.type(emailInput, "t");
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  test("clears password error when user types", async () => {
    const user = userEvent.setup();
    renderLogin();

    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Submit with empty password to trigger error
    await user.click(submitButton);
    expect(screen.getByText("Password is required")).toBeInTheDocument();

    // Type in password field
    await user.type(passwordInput, "1");
    expect(screen.queryByText("Password is required")).not.toBeInTheDocument();
  });

  test("toggles password visibility", async () => {
    const user = userEvent.setup();
    renderLogin();

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", { name: "" }); // The eye icon button

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("submits form with valid data", async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("shows loading state during submission", async () => {
    mockLogin.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // Check for loading state - button should be disabled or show loading
    expect(submitButton).toBeDisabled();
  });

  test("handles remember me checkbox", async () => {
    const user = userEvent.setup();
    renderLogin();

    const rememberMeCheckbox = screen.getByRole("checkbox", {
      name: /remember me/i,
    });

    expect(rememberMeCheckbox).not.toBeChecked();

    await user.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();

    await user.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();
  });

  test("navigates to signup page", async () => {
    const user = userEvent.setup();
    renderLogin();

    const signupLink = screen.getByRole("link", { name: /sign up/i });
    expect(signupLink).toHaveAttribute("href", "/signup");
  });
});
