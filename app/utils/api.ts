// Function to check if localhost server is running
async function checkLocalhost(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(2000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

// AI API: Check localhost first, fallback to production
const AI_API = await (async () => {
  const isRunning = await checkLocalhost("http://localhost:8000/api");
  return isRunning
    ? "http://localhost:8000/api"
    : "https://jobpsych-ai.vercel.app/api";
})();

// Auth API: Check localhost first, fallback to production
const API_AUTH_URL = await (async () => {
  const isRunning = await checkLocalhost("http://localhost:5000/api");
  return isRunning
    ? "http://localhost:5000/api"
    : "https://jobpsych-auth.vercel.app/api";
})();

export { AI_API, API_AUTH_URL };
