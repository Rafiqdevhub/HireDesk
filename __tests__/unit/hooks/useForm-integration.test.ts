import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "../../../app/hooks/useForm";

describe("useForm Hook Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("manages form state correctly", () => {
    const initialValues = { name: "", email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  test("handles input changes", () => {
    const initialValues = { name: "", email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe", type: "text" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.name).toBe("John Doe");
    expect(result.current.values.email).toBe("");
  });

  test("manages validation errors", () => {
    const initialValues = { email: "" };
    const validation = (values: typeof initialValues) => {
      const errors: Partial<Record<keyof typeof initialValues, string>> = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      return errors;
    };

    const { result } = renderHook(() => useForm(initialValues, validation));

    act(() => {
      result.current.setError("email", "Custom error");
    });

    expect(result.current.errors.email).toBe("Custom error");

    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
  });

  test("resets form state", () => {
    const initialValues = { name: "Initial", email: "test@example.com" };
    const { result } = renderHook(() => useForm(initialValues));

    // Modify values
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Changed", type: "text" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.setError("email", "Some error");
    });

    expect(result.current.values.name).toBe("Changed");
    expect(result.current.errors.email).toBe("Some error");

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  test("handles checkbox inputs", () => {
    const initialValues = { acceptTerms: false };
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange({
        target: { name: "acceptTerms", type: "checkbox", checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.acceptTerms).toBe(true);
  });

  test("clears errors on field change", () => {
    const initialValues = { email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    // Set error
    act(() => {
      result.current.setError("email", "Email error");
    });

    expect(result.current.errors.email).toBe("Email error");

    // Change field value - should clear error
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com", type: "text" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.errors.email).toBeUndefined();
    expect(result.current.values.email).toBe("test@example.com");
  });

  test("handles form submission with validation", async () => {
    const initialValues = { name: "", email: "" };
    const validation = (values: typeof initialValues) => {
      const errors: Partial<Record<keyof typeof initialValues, string>> = {};
      if (!values.name) errors.name = "Name required";
      if (!values.email) errors.email = "Email required";
      return errors;
    };

    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useForm(initialValues, validation));

    // Submit without filling required fields
    await act(async () => {
      const submitHandler = result.current.handleSubmit(mockSubmit);
      await submitHandler({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(result.current.errors.name).toBe("Name required");
    expect(result.current.errors.email).toBe("Email required");

    // Fill fields and submit
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John", type: "text" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "email", value: "john@example.com", type: "text" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      const submitHandler = result.current.handleSubmit(mockSubmit);
      await submitHandler({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "John",
      email: "john@example.com",
    });
  });
});
