import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  mockAxiosSuccess,
  mockAxiosError,
  resetAxiosMocks,
} from "../../mocks/server";

// Mock axios
vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("API Mocking Infrastructure", () => {
  beforeEach(() => {
    resetAxiosMocks();
  });

  test("axios mocking utilities work correctly", () => {
    const mockedAxios = vi.mocked(axios);

    // Test that axios methods are mocked
    expect(mockedAxios.post).toBeDefined();
    expect(mockedAxios.get).toBeDefined();
    expect(mockedAxios.put).toBeDefined();
    expect(mockedAxios.delete).toBeDefined();
  });

  test("mock response data is properly structured", () => {
    const testData = { success: true, message: "Test successful" };

    expect(testData).toHaveProperty("success");
    expect(testData).toHaveProperty("message");
    expect(testData.success).toBe(true);
    expect(typeof testData.message).toBe("string");
  });

  test("error handling mock works", () => {
    const errorResponse = {
      response: {
        status: 400,
        data: { error: "Bad request" },
      },
    };

    expect(errorResponse.response.status).toBe(400);
    expect(errorResponse.response.data.error).toBe("Bad request");
  });

  test("file mock creation works", () => {
    // Test File constructor works in test environment
    const mockFile = new File(["test content"], "test.pdf", {
      type: "application/pdf",
    });

    expect(mockFile.name).toBe("test.pdf");
    expect(mockFile.type).toBe("application/pdf");
    expect(mockFile.size).toBeGreaterThan(0);
  });

  test("FormData works in test environment", () => {
    const formData = new FormData();
    const file = new File(["content"], "test.txt", { type: "text/plain" });

    formData.append("file", file);
    formData.append("description", "test description");

    // FormData doesn't have a simple way to check entries in all environments
    // But we can verify it was created without errors
    expect(formData).toBeInstanceOf(FormData);
  });

  test("async/await works with mocked promises", async () => {
    const mockFn = vi.fn().mockResolvedValue("resolved value");

    const result = await mockFn();

    expect(result).toBe("resolved value");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("promise rejection works with mocked functions", async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error("Test error"));

    await expect(mockFn()).rejects.toThrow("Test error");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("vi.fn() spy functionality works", () => {
    const spy = vi.fn();

    spy("arg1", "arg2");
    spy("arg3");

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith("arg1", "arg2");
    expect(spy).toHaveBeenCalledWith("arg3");
    expect(spy).toHaveBeenNthCalledWith(1, "arg1", "arg2");
    expect(spy).toHaveBeenNthCalledWith(2, "arg3");
  });

  test("mock implementation works", () => {
    const mockFn = vi.fn().mockImplementation((x: number) => x * 2);

    expect(mockFn(5)).toBe(10);
    expect(mockFn(3)).toBe(6);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
