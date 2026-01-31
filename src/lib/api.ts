type TApiFootballError = {
  message?: string
  errors?: Record<string, string>
}

const getApiFootballEnv = () => {
  const baseUrl = process.env.API_FOOTBALL_BASE_URL
  const key = process.env.API_FOOTBALL_KEY
  const host = process.env.API_FOOTBALL_HOST

  if (!baseUrl || !key || !host) {
    throw new Error("API Football environment variables are not set.")
  }

  return { baseUrl, key, host }
};

const readErrorMessage = async (res: Response) => {
  if (res.status === 429) {
    return "You exceed the limit of requests to the API. Please try again later."
  }

  try {
    const body = (await res.json()) as TApiFootballError

    if (body?.message) {
      return body.message
    }

    const firstError = body?.errors
      ? Object.values(body.errors)[0]
      : undefined

    if (firstError) {
      return firstError
    }
  } catch (error) {
    console.error("Failed to parse API Football error response:", error)
  }

  return `API error (${res.status})`
};

export const apiFootballFetch = async <T>(
  path: string,
  init: RequestInit = {}
): Promise<T> => {
  const { baseUrl, key, host } = getApiFootballEnv()

  const res = await fetch(new URL(path, baseUrl), {
    ...init,
    headers: {
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
      ...init.headers,
    },
    cache: init.cache ?? "no-store",
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res))
  }

  return res.json() as Promise<T>
};
