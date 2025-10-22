import { useState } from "react";
import type { UseFormReturn } from "../../types";

export const useForm = <T extends Record<string, any>>(
  initialState: T,
  validation?: (values: T) => Partial<Record<keyof T, string>>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof T]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const setError = (field: keyof T, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const reset = () => {
    setValues(initialState);
    setErrors({});
    setIsLoading(false);
  };

  const handleSubmit = (onSubmit: (values: T) => Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();

      // Clear previous errors
      setErrors({});

      // Run validation if provided
      if (validation) {
        const validationErrors = validation(values);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }

      setIsLoading(true);

      try {
        await onSubmit(values);
      } catch (error: any) {
        // Let the calling component handle the error via AuthContext toasts
        // We only handle field-specific validation errors here
        if (error.response?.data?.field && error.response?.data?.message) {
          setError(
            error.response.data.field as keyof T,
            error.response.data.message
          );
        }
        // Re-throw the error so the calling component can handle it
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    setError,
    clearErrors,
    reset,
  };
};
