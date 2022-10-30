export const unique = <T>(items: T[]): T[] => {
  return [...new Set(items)]
}