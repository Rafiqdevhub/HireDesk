import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "../../../app/hooks/useForm";

describe("useForm Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with default values", () => {
    const initialValues = { name: "", email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  test("handles input changes correctly", () => {
    const initialValues = { name: "", email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.name).toBe("John Doe");
  });

  test("clears error when field value changes", () => {
    const initialValues = { email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    // Set an error first
    act(() => {
      result.current.setError("email", "Invalid email");
    });

    expect(result.current.errors.email).toBe("Invalid email");

    // Change the field value
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  test("handles checkbox inputs correctly", () => {
    const initialValues = { acceptTerms: false };
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange({
        target: { name: "acceptTerms", type: "checkbox", checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.acceptTerms).toBe(true);
  });

  test("validates form with validation function", async () => {
    const initialValues = { name: "", email: "" };
    const validation = (values: typeof initialValues) => {
      const errors: Partial<Record<keyof typeof initialValues, string>> = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.email) errors.email = "Email is required";
      return errors;
    };

    const { result } = renderHook(() => useForm(initialValues, validation));
    const mockSubmit = vi.fn();

    await act(async () => {
      const submitHandler = result.current.handleSubmit(mockSubmit);
      await submitHandler({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(result.current.errors.name).toBe("Name is required");
    expect(result.current.errors.email).toBe("Email is required");
  });

  test("handles successful form submission", async () => {
    const initialValues = { name: "John Doe", email: "john@example.com" };
    const mockSubmit = vi.fn().mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useForm(initialValues));

    await act(async () => {
      const submitHandler = result.current.handleSubmit(mockSubmit);
      await submitHandler({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockSubmit).toHaveBeenCalledWith(initialValues);
    expect(result.current.isLoading).toBe(false);
  });

  test("handles submission errors with field-specific messages", async () => {
    const initialValues = { email: "test@example.com" };
    const mockError = {
      response: {
        data: {
          field: "email",
          message: "Email already exists",
        },
      },
    };
    const mockSubmit = vi.fn().mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useForm(initialValues));

    await act(async () => {
      try {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        await submitHandler({
          preventDefault: vi.fn(),
        } as unknown as React.FormEvent);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.errors.email).toBe("Email already exists");
    expect(result.current.isLoading).toBe(false);
  });

  test("handles generic submission errors", async () => {
    const initialValues = { name: "John" };
    const mockSubmit = vi
      .fn()
      .mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useForm(initialValues));

    await act(async () => {
      try {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        await submitHandler({
          preventDefault: vi.fn(),
        } as unknown as React.FormEvent);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    expect(result.current.isLoading).toBe(false);
  });

  test("resets form to initial values", () => {
    const initialValues = { name: "", email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    // Modify values and set errors
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.setError("email", "Test error");
    });

    expect(result.current.values.name).toBe("John");
    expect(result.current.errors.email).toBe("Test error");

    // Reset form
    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  test("sets field error programmatically", () => {
    const initialValues = { email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.setError("email", "Custom error message");
    });

    expect(result.current.errors.email).toBe("Custom error message");
  });

  test("clears all errors", () => {
    const initialValues = { name: "", email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    // Set multiple errors
    act(() => {
      result.current.setError("name", "Name error");
      result.current.setError("email", "Email error");
    });

    expect(result.current.errors.name).toBe("Name error");
    expect(result.current.errors.email).toBe("Email error");

    // Clear all errors
    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
  });

  test("manages loading state during submission", async () => {
    const initialValues = { name: "John" };
    let resolveSubmit: () => void;
    const mockSubmit = vi.fn().mockImplementation(() => {
      return new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
    });

    const { result } = renderHook(() => useForm(initialValues));

    // Start submission
    act(() => {
      const submitHandler = result.current.handleSubmit(mockSubmit);
      submitHandler({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.isLoading).toBe(true);

    // Complete submission
    await act(async () => {
      resolveSubmit();
    });

    expect(result.current.isLoading).toBe(false);
  });
});
