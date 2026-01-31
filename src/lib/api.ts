import { TApiFootballResponse, TMatch } from "./types";
import { readErrorMessage } from "./utils";

const getApiFootballEnv = () => {
  const baseUrl = process.env.API_FOOTBALL_BASE_URL
  const key = process.env.API_FOOTBALL_KEY
  const host = process.env.API_FOOTBALL_HOST

  if (!baseUrl || !key || !host) {
    throw new Error("API Football environment variables are not set.")
  }

  return { baseUrl, key, host }
}

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
    }
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res))
  }

  return res.json() as Promise<T>
}

export const getFixturesByDate = async (dateISO: string) => {
  return apiFootballFetch<TApiFootballResponse<TMatch[]>>(
    `/fixtures?date=${dateISO}`,
    { next: { revalidate: 60 * 10 } }
  )
}
