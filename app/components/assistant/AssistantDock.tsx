import { useEffect, useState } from "react";
import { assistantService } from "@services/assistantService";
import { useToast } from "@contexts/ToastContext";
import { useForm } from "@hooks/useForm";
import type {
  HireDeskQueryPayload,
  HireDeskQueryResponse,
  HireDeskQueryType,
} from "@app-types";

const initialForm = {
  query: "",
  queryType: "screening" as HireDeskQueryType,
};

type DockMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  queryType: HireDeskQueryType;
  ts: string;
};

const AssistantDock = () => {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<DockMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [mockMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("mock") === "1";
  });

  const { values, errors, handleChange, handleSubmit, reset, setValues } =
    useForm<typeof initialForm>(initialForm, (v) => {
      const errs: Partial<Record<keyof typeof initialForm, string>> = {};
      const trimmed = v.query.trim();
      if (!trimmed) {
        errs.query = "Query is required.";
      } else if (trimmed.length > 2000) {
        errs.query = "Max 2000 characters.";
      }
      return errs;
    });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("assistant_dock_messages");
    const savedForm = window.localStorage.getItem("assistant_dock_form");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (error) {
        console.warn("Could not parse dock messages", error);
      }
    }
    if (savedForm) {
      try {
        setValues({ ...initialForm, ...JSON.parse(savedForm) });
      } catch (error) {
        console.warn("Could not parse dock form", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "assistant_dock_messages",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("assistant_dock_form", JSON.stringify(values));
  }, [values]);

  const addMessage = (msg: DockMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const mockResponse = (
    payload: HireDeskQueryPayload
  ): HireDeskQueryResponse => ({
    success: true,
    data: {
      answer: `Mock ${payload.queryType} response for your request.`,
      queryType: payload.queryType,
      timestamp: new Date().toISOString(),
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    setPending(true);
    const payload: HireDeskQueryPayload = {
      query: formValues.query.trim(),
      queryType: formValues.queryType,
    };

    addMessage({
      id: `user-${Date.now()}`,
      role: "user",
      content: payload.query,
      queryType: payload.queryType,
      ts: new Date().toISOString(),
    });

    try {
      const response = mockMode
        ? mockResponse(payload)
        : await assistantService.query(payload);

      if (!response.success) {
        throw new Error(response.message || "Assistant request failed");
      }

      addMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.data.answer,
        queryType: response.data.queryType,
        ts: response.data.timestamp,
      });
      showToast("Assistant responded", "success", { title: "HireDesk" });
    } catch (error: any) {
      console.error("Assistant dock error", error);
      showToast(
        error?.message || "Unable to process request. Please retry.",
        "error",
        { title: "Assistant error" }
      );
    } finally {
      setPending(false);
    }
  });

  const clearHistory = () => {
    setMessages([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("assistant_dock_messages");
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 w-[320px] sm:w-[360px] max-w-[calc(100%-2rem)]">
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/85 backdrop-blur-2xl shadow-2xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -inset-16 bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl"></div>
        </div>

        {open && (
          <div className="relative p-4 space-y-3">
            <form className="space-y-3" onSubmit={onSubmit}>
              <div className="space-y-1">
                <label
                  htmlFor="dock-query"
                  className="text-xs font-medium text-slate-200 flex items-center justify-between"
                >
                  <span>Ask HireDesk</span>
                  <span className="text-[11px] text-slate-400">
                    {values.query.trim().length}/2000
                  </span>
                </label>
                <div className="rounded-xl border border-slate-700 bg-slate-800/70 focus-within:border-indigo-500/70 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all overflow-hidden">
                  <textarea
                    id="dock-query"
                    name="query"
                    value={values.query}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none resize-none"
                    placeholder="Screening, interview Qs, job posting, or matching."
                  />
                </div>
                {errors.query && (
                  <p className="text-[11px] text-red-400">{errors.query}</p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="dock-type"
                  className="text-xs font-medium text-slate-200"
                >
                  Query type
                </label>
                <div className="rounded-xl border border-slate-700 bg-slate-800/70 focus-within:border-indigo-500/70 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all overflow-hidden">
                  <select
                    id="dock-type"
                    name="queryType"
                    value={values.queryType}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-2 text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="screening">Screening</option>
                    <option value="interview_questions">
                      Interview questions
                    </option>
                    <option value="job_posting">Job posting</option>
                    <option value="candidate_match">Candidate match</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.75 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-400/60 cursor-pointer"
              >
                {pending ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {messages.length === 0 && (
                <p className="text-xs text-slate-400">
                  No messages yet. Ask something to begin.
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-xl border px-3 py-2 backdrop-blur-sm ${
                    msg.role === "user"
                      ? "border-indigo-500/30 bg-indigo-500/10"
                      : "border-emerald-500/30 bg-emerald-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wide ${
                        msg.role === "user"
                          ? "text-indigo-100"
                          : "text-emerald-100"
                      }`}
                    >
                      {msg.role === "user" ? "You" : "HireDesk"}
                    </span>
                    <span className="text-[10px] text-slate-300 bg-slate-800/80 rounded-full px-2 py-0.5">
                      {msg.queryType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-100 leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantDock;
