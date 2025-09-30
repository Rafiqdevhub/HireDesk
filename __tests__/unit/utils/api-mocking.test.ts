import { describe, test, expect, vi } from "vitest";

// Mock axios for testing
vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("API Mocking Setup", () => {
  test("axios is properly mocked", async () => {
    const axios = (await import("axios")).default;

    // Mock the response
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValueOnce(mockResponse);

    // Test the mock
    const response = await axios.post("/test-endpoint", { test: "data" });
    expect(response).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledWith("/test-endpoint", { test: "data" });
  });

  test("can mock different HTTP methods", async () => {
    const axios = (await import("axios")).default;

    // Mock different methods
    axios.get.mockResolvedValueOnce({ data: "GET response" });
    axios.put.mockResolvedValueOnce({ data: "PUT response" });
    axios.delete.mockResolvedValueOnce({ data: "DELETE response" });

    // Test each method
    await axios.get("/test");
    await axios.put("/test", { data: "test" });
    await axios.delete("/test");

    expect(axios.get).toHaveBeenCalledWith("/test");
    expect(axios.put).toHaveBeenCalledWith("/test", { data: "test" });
    expect(axios.delete).toHaveBeenCalledWith("/test");
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
    axios.post.mockRejectedValueOnce(mockError);

    // Test error handling
    try {
      await axios.post("/error-endpoint", {});
      expect(true).toBe(false); // Should not reach here
    } catch (error) {
      expect(error.response.status).toBe(500);
      expect(error.response.data.error).toBe("Internal server error");
    }
  });
});
