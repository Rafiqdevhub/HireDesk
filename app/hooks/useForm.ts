import { useState, useCallback } from "react";
import type { UseFormReturn } from "@app-types";

export const useForm = <T extends Record<string, any>>(
  initialState: T,
  validation?: (values: T) => Partial<Record<keyof T, string>>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value, type } = e.target;

      setValues((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));

      setErrors((prev) => {
        if (prev[name as keyof T]) {
          return {
            ...prev,
            [name]: undefined,
          };
        }
        return prev;
      });
    },
    []
  );

  const setError = useCallback((field: keyof T, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setIsLoading(false);
  }, [initialState]);

  const setFormValues = useCallback((nextValues: T) => {
    setValues(nextValues);
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void>) => {
      return async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});

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
          if (error.response?.data?.field && error.response?.data?.message) {
            setErrors((prev) => ({
              ...prev,
              [error.response.data.field as keyof T]:
                error.response.data.message,
            }));
          }
          throw error;
        } finally {
          setIsLoading(false);
        }
      };
    },
    [values, validation]
  );

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValues: setFormValues,
  };
};
