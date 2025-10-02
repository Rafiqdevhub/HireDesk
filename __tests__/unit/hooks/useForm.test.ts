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

  test("validates form before submission", async () => {
    const initialValues = { email: "" };
    const validation = (values: typeof initialValues) => {
      const errors: Partial<Record<keyof typeof initialValues, string>> = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      return errors;
    };

    const { result } = renderHook(() => useForm(initialValues, validation));
    const mockSubmit = vi.fn();

    await act(async () => {
      const submitHandler = result.current.handleSubmit(mockSubmit);
      await submitHandler({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.errors.email).toBe("Email is required");
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("submits form with valid data", async () => {
    const initialValues = { email: "test@example.com" };
    const { result } = renderHook(() => useForm(initialValues));
    const mockSubmit = vi.fn().mockResolvedValue(undefined);

    await act(async () => {
      const submitHandler = result.current.handleSubmit(mockSubmit);
      await submitHandler({ preventDefault: vi.fn() } as any);
    });

    expect(mockSubmit).toHaveBeenCalledWith(initialValues);
  });

  test("sets loading state during submission", async () => {
    const initialValues = { email: "test@example.com" };
    const { result } = renderHook(() => useForm(initialValues));
    const mockSubmit = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

    const submitPromise = act(async () => {
      const submitHandler = result.current.handleSubmit(mockSubmit);
      return submitHandler({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.isLoading).toBe(true);

    await submitPromise;

    expect(result.current.isLoading).toBe(false);
  });

  test("resets form to initial state", () => {
    const initialValues = { name: "", email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    // Change values and add errors
    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.setError("email", "Error message");
    });

    expect(result.current.values.name).toBe("John");
    expect(result.current.errors.email).toBe("Error message");

    // Reset form
    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });

  test("clears all errors", () => {
    const initialValues = { name: "", email: "" };
    const { result } = renderHook(() => useForm(initialValues));

    // Add multiple errors
    act(() => {
      result.current.setError("name", "Name error");
      result.current.setError("email", "Email error");
    });

    expect(result.current.errors).toEqual({
      name: "Name error",
      email: "Email error",
    });

    // Clear all errors
    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
  });
});
