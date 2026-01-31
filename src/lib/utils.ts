import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TApiFootballError } from "./types"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getDateFromPath = (pathname: string) => {
  const m = pathname.match(/^\/fixtures\/(\d{4}-\d{2}-\d{2})$/)
  return m?.[1] ?? null
}

const TZ = "Europe/Skopje"

export const getTodayISO = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date())

  const y = parts.find((p) => p.type === "year")?.value ?? "0000"
  const m = parts.find((p) => p.type === "month")?.value ?? "00"
  const d = parts.find((p) => p.type === "day")?.value ?? "00"
  return `${y}-${m}-${d}`
}

export const formatTimeHHmm = (isoDateTime: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(isoDateTime))
}

export const readErrorMessage = async (res: Response) => {
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
