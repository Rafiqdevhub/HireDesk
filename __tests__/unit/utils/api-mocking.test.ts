import { describe, test, expect, vi, beforeEach } from "vitest";

// Create mock functions
const mockPost = vi.fn();
const mockGet = vi.fn();
const mockPut = vi.fn();
const mockDelete = vi.fn();

// Mock axios for testing
vi.mock("axios", () => ({
  default: {
    post: mockPost,
    get: mockGet,
    put: mockPut,
    delete: mockDelete,
  },
}));

describe("API Mocking Setup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("axios is properly mocked", async () => {
    const axios = (await import("axios")).default;

    // Mock the response
    const mockResponse = { data: { success: true } };
    mockPost.mockResolvedValueOnce(mockResponse);

    // Test the mock
    const response = await axios.post("/test-endpoint", { test: "data" });
    expect(response).toEqual(mockResponse);
    expect(mockPost).toHaveBeenCalledWith("/test-endpoint", { test: "data" });
  });

  test("can mock different HTTP methods", async () => {
    const axios = (await import("axios")).default;

    // Mock different methods
    mockGet.mockResolvedValueOnce({ data: "GET response" });
    mockPut.mockResolvedValueOnce({ data: "PUT response" });
    mockDelete.mockResolvedValueOnce({ data: "DELETE response" });

    // Test each method
    await axios.get("/test");
    await axios.put("/test", { data: "test" });
    await axios.delete("/test");

    expect(mockGet).toHaveBeenCalledWith("/test");
    expect(mockPut).toHaveBeenCalledWith("/test", { data: "test" });
    expect(mockDelete).toHaveBeenCalledWith("/test");
  });

  test("can mock error responses", async () => {
    const axios = (await import("axios")).default;

    // Mock an error response
    const mockError = {
      response: {
        status: 500,
        data: { error: "Internal server error" },
      },
    };
    mockPost.mockRejectedValueOnce(mockError);

    // Test error handling
    try {
      await axios.post("/error-endpoint", {});
      expect(true).toBe(false); // Should not reach here
    } catch (error: unknown) {
      const axiosError = error as {
        response: { status: number; data: { error: string } };
      };
      expect(axiosError.response.status).toBe(500);
      expect(axiosError.response.data.error).toBe("Internal server error");
    }
  });
});
