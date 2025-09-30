export const getErrorCategory = (error: any): string => {
  if (!error || typeof error !== "object") {
    return "general";
  }

  const message = error.message?.toLowerCase() || "";

  if (message.includes("network") || message.includes("fetch")) {
    return "network";
  }
  if (message.includes("file") || message.includes("upload")) {
    return "file";
  }
  if (message.includes("validation") || message.includes("required")) {
    return "validation";
  }
  if (message.includes("limit") || message.includes("quota")) {
    return "limit";
  }
  return "general";
};

export const formatErrorMessage = (error: any): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && error.message !== undefined) {
    return error.message || "An unexpected error occurred";
  }
  return "An unexpected error occurred";
};
