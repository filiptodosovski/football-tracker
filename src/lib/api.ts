import { REVALIDATE_SECONDS } from "./constants";
import { TApiFootballResponse, TLeagueResponse, TMatch } from "./types";
import { readErrorMessage } from "./utils";

const getApiFootballEnv = () => {
  const baseUrl = process.env.API_FOOTBALL_BASE_URL
  const key = process.env.API_FOOTBALL_KEY

  if (!baseUrl || !key) {
    throw new Error("API Football environment variables are not set.")
  }

  return { baseUrl, key }
}

export const apiFootballFetch = async <T>(
  path: string,
  init: RequestInit = {}
): Promise<T> => {
  const { baseUrl, key } = getApiFootballEnv()

  const res = await fetch(new URL(path, baseUrl), {
    ...init,
    headers: {
      "x-apisports-key": key,
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
    { next: { revalidate: REVALIDATE_SECONDS } }
  )
}

export const getStandings = async (leagueId: string | number, season: number) => {
  return apiFootballFetch<TApiFootballResponse<TLeagueResponse[]>>(
    `/standings?league=${leagueId}&season=${season}`,
  )
}

export const getFixtures = async (leagueId: string | number, season: number) => {
  return apiFootballFetch<TApiFootballResponse<TMatch[]>>(
    `/fixtures?league=${leagueId}&season=${season}`,
  )
}

export const getMatchDetails = async (fixtureId: string) => {
  return apiFootballFetch<TApiFootballResponse<TMatch[]>>(
    `/fixtures?id=${fixtureId}`
  )
}
