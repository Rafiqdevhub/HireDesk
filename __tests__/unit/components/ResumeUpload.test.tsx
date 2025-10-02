import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResumeUpload from "../../../app/components/resume/ResumeUpload";

describe("ResumeUpload Component", () => {
  const mockOnFileUpload = vi.fn();
  const mockOnError = vi.fn();
  const mockOnResumeUploaded = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders upload area correctly", () => {
    render(<ResumeUpload />);

    expect(screen.getByText("Review Candidate Resume")).toBeInTheDocument();
    expect(
      screen.getByText("Upload candidate's resume (drag & drop or click here)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Accepts PDF, DOC, and DOCX formats")
    ).toBeInTheDocument();
  });

  test("shows premium badge when isPremium is true", () => {
    render(<ResumeUpload isPremium={true} />);

    expect(screen.getByText("Premium Analysis Enabled")).toBeInTheDocument();
  });

  test("accepts valid PDF file upload", async () => {
    const user = userEvent.setup();
    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });
    const input = screen.getByLabelText("Upload resume file");

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("accepts valid DOCX file upload", async () => {
    const user = userEvent.setup();
    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const file = new File(["test content"], "resume.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const input = screen.getByLabelText("Upload resume file");

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("rejects invalid file type", async () => {
    const user = userEvent.setup();
    render(<ResumeUpload onError={mockOnError} />);

    const file = new File(["test content"], "resume.txt", {
      type: "text/plain",
    });
    const input = screen.getByLabelText("Upload resume file");

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnError).toHaveBeenCalledWith({
      message:
        "Invalid file type: text/plain. Please upload a PDF or Word document.",
      type: "warning",
      category: "file",
    });
  });

  test("handles drag and drop of valid file", () => {
    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const dropZone = screen
      .getByText("Upload candidate's resume (drag & drop or click here)")
      .closest("div");
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    fireEvent.drop(dropZone!, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("handles drag and drop of invalid file", () => {
    render(<ResumeUpload onError={mockOnError} />);

    const dropZone = screen
      .getByText("Upload candidate's resume (drag & drop or click here)")
      .closest("div");
    const file = new File(["test content"], "resume.txt", {
      type: "text/plain",
    });

    fireEvent.drop(dropZone!, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(mockOnError).toHaveBeenCalledWith({
      message:
        "Invalid file type: text/plain. Please upload a PDF or Word document.",
      type: "warning",
      category: "file",
    });
  });

  test("shows loading state", () => {
    render(<ResumeUpload isLoading={true} />);

    expect(screen.getByText("Processing resume...")).toBeInTheDocument();
  });

  test("disables interactions when loading", async () => {
    const user = userEvent.setup();
    render(<ResumeUpload isLoading={true} onFileUpload={mockOnFileUpload} />);

    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });
    const input = screen.getByLabelText("Upload resume file");

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileUpload).not.toHaveBeenCalled();
  });

  test("displays selected file information", async () => {
    const user = userEvent.setup();
    render(<ResumeUpload />);

    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });
    const input = screen.getByLabelText("Upload resume file");

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("resume.pdf")).toBeInTheDocument();
    expect(screen.getByText("0.0 KB")).toBeInTheDocument();
  });

  test("calls onResumeUploaded for premium users", async () => {
    const user = userEvent.setup();
    render(
      <ResumeUpload
        isPremium={true}
        onFileUpload={mockOnFileUpload}
        onResumeUploaded={mockOnResumeUploaded}
      />
    );

    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });
    const input = screen.getByLabelText("Upload resume file");

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnResumeUploaded).toHaveBeenCalled();
  });

  test("prevents drag and drop when loading", () => {
    render(<ResumeUpload isLoading={true} onFileUpload={mockOnFileUpload} />);

    const dropZone = screen.getByText("Processing resume...").closest("div");
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    fireEvent.drop(dropZone!, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(mockOnFileUpload).not.toHaveBeenCalled();
  });
});
