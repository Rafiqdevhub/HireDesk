export const getErrorCategory = (error: any): string => {
  if (error.message?.includes("network") || error.message?.includes("fetch")) {
    return "network";
  }
  if (error.message?.includes("file") || error.message?.includes("upload")) {
    return "file";
  }
  if (
    error.message?.includes("validation") ||
    error.message?.includes("required")
  ) {
    return "validation";
  }
  if (error.message?.includes("limit") || error.message?.includes("quota")) {
    return "limit";
  }
  return "general";
};

export const formatErrorMessage = (error: any): string => {
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  return "An unexpected error occurred";
};
