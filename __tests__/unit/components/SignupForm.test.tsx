import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "../../../app/contexts/AuthContext";
import Signup from "../../../app/routes/signup";

// Mock the auth context
const mockSignup = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../../app/contexts/AuthContext", () => ({
  useAuth: () => ({
    signup: mockSignup,
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

describe("Signup Form Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSignup = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test("renders signup form correctly", () => {
    renderSignup();

    expect(screen.getByText("Create Your Account")).toBeInTheDocument();
    expect(
      screen.getByText("Join HireDesk and revolutionize your hiring process")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();
  });

  test("validates name field - required", async () => {
    const user = userEvent.setup();
    renderSignup();

    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.click(submitButton);

    expect(screen.getByText("Full name is required")).toBeInTheDocument();
  });

  test("validates email field - required", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.click(submitButton);

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  test("validates email field - invalid format", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  });

  test("validates password field - required", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("validates password field - minimum length", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "1234567");
    await user.click(submitButton);

    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
  });

  test("validates password field - complexity requirements", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password");
    await user.click(submitButton);

    expect(
      screen.getByText(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
    ).toBeInTheDocument();
  });

  test("validates confirm password field - required", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123");
    await user.click(submitButton);

    expect(
      screen.getByText("Please confirm your password")
    ).toBeInTheDocument();
  });

  test("validates confirm password field - mismatch", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123");
    await user.type(confirmPasswordInput, "Password456");
    await user.click(submitButton);

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  test("validates terms agreement - required", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123");
    await user.type(confirmPasswordInput, "Password123");
    await user.click(submitButton);

    expect(
      screen.getByText("You must agree to the terms and conditions")
    ).toBeInTheDocument();
  });

  test("clears validation errors when user types", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    // Submit with empty name to trigger error
    await user.click(submitButton);
    expect(screen.getByText("Full name is required")).toBeInTheDocument();

    // Type in name field
    await user.type(nameInput, "J");
    expect(screen.queryByText("Full name is required")).not.toBeInTheDocument();
  });

  test("toggles password visibility", async () => {
    const user = userEvent.setup();
    renderSignup();

    const passwordInput = screen.getByLabelText("Password");
    const toggleButtons = screen.getAllByRole("button", { name: "" }); // Eye icon buttons

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    await user.click(toggleButtons[0]);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide
    await user.click(toggleButtons[0]);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("toggles confirm password visibility", async () => {
    const user = userEvent.setup();
    renderSignup();

    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const toggleButtons = screen.getAllByRole("button", { name: "" }); // Eye icon buttons

    // Initially password should be hidden
    expect(confirmPasswordInput).toHaveAttribute("type", "password");

    // Click to show password
    await user.click(toggleButtons[1]);
    expect(confirmPasswordInput).toHaveAttribute("type", "text");

    // Click again to hide
    await user.click(toggleButtons[1]);
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });

  test("handles terms checkbox", async () => {
    const user = userEvent.setup();
    renderSignup();

    const termsCheckbox = screen.getByRole("checkbox", {
      name: /i agree to the terms/i,
    });

    expect(termsCheckbox).not.toBeChecked();

    await user.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();

    await user.click(termsCheckbox);
    expect(termsCheckbox).not.toBeChecked();
  });

  test("submits form with valid data", async () => {
    const user = userEvent.setup();
    renderSignup();

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const companyInput = screen.getByLabelText("Company Name");
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /i agree to the terms/i,
    });
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123");
    await user.type(confirmPasswordInput, "Password123");
    await user.type(companyInput, "Test Company");
    await user.click(termsCheckbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        name: "John Doe",
        email: "test@example.com",
        password: "Password123",
        company_name: "Test Company",
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  // test("shows loading state during submission", async () => {
  //   mockSignup.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
  //   const user = userEvent.setup();
  //   renderSignup();

  //   const nameInput = screen.getByLabelText("Full Name");
  //   const emailInput = screen.getByLabelText("Email Address");
  //   const passwordInput = screen.getByLabelText("Password");
  //   const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  //   const companyInput = screen.getByLabelText("Company Name");
  //   const termsCheckbox = screen.getByRole("checkbox", { name: /i agree to the terms/i });
  //   const submitButton = screen.getByRole("button", { name: /create account/i });

  //   await user.type(nameInput, "John Doe");
  //   await user.type(emailInput, "test@example.com");
  //   await user.type(passwordInput, "Password123");
  //   await user.type(confirmPasswordInput, "Password123");
  //   await user.type(companyInput, "Test Company");
  //   await user.click(termsCheckbox);

  //   await act(async () => {
  //     await user.click(submitButton);
  //   });

  //   // Re-query the button to get the updated state
  //   const updatedButton = screen.getByRole("button", { name: /create account/i });
  //   expect(updatedButton).toBeDisabled();
  // });

  test("navigates to login page", async () => {
    const user = userEvent.setup();
    renderSignup();

    const loginLink = screen.getByRole("link", { name: /sign in/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
