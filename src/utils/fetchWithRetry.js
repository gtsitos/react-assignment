const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 500;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default async function fetchWithRetry(
  input,
  init,
  {
    retries = DEFAULT_RETRIES,
    retryDelayMs = DEFAULT_RETRY_DELAY_MS,
    shouldRetry = response => response.status >= 500 || response.status === 408
  } = {}
) {
  let attempt = 0;
  let lastError;

  while (attempt <= retries) {
    try {
      const response = await fetch(input, init);

      if (!response.ok) {
        if (attempt === retries || !shouldRetry(response)) {
          const error = new Error(`Request failed with status ${response.status}`);
          error.response = response;
          throw error;
        }
      } else {
        return response;
      }
    } catch (error) {
      lastError = error;
      if (attempt === retries) {
        break;
      }
    }

    attempt += 1;
    const delay = retryDelayMs * attempt;
    await sleep(delay);
  }

  throw lastError;
}

