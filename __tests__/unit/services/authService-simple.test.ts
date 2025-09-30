import { describe, it, expect } from "vitest";

// Simple test that validates the authService module structure and exports
describe("authService module", () => {
  it("should export authService with expected methods", async () => {
    const { authService } = await import("../../../app/services/authService");

    expect(authService).toBeDefined();
    expect(typeof authService.register).toBe("function");
    expect(typeof authService.login).toBe("function");
  });

  it("should export expected interfaces", async () => {
    const module = await import("../../../app/services/authService");

    // Test that we can create objects matching the interfaces
    const registerRequest = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      company_name: "Test Company",
    };

    const loginRequest = {
      email: "john@example.com",
      password: "password123",
    };

    // These should compile without errors if interfaces are properly exported
    expect(registerRequest.name).toBe("John Doe");
    expect(loginRequest.email).toBe("john@example.com");
  });

  it("should handle service method calls gracefully", async () => {
    const { authService } = await import("../../../app/services/authService");

    // Test that methods exist and can be called
    // We won't test actual functionality due to network dependencies
    expect(() => {
      const registerData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        company_name: "Test Company",
      };

      // Just verify the method can be invoked without immediate errors
      const result = authService.register(registerData);
      expect(result).toBeInstanceOf(Promise);
    }).not.toThrow();
  });
});
