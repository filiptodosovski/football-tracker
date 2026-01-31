export const getDateFromPath = (pathname: string) => {
  const m = pathname.match(/^\/fixtures\/(\d{4}-\d{2}-\d{2})$/)
  return m?.[1] ?? null
}
