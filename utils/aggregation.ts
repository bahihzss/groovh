export const sum = <T>(collection: T[], key: keyof T) => {
  return collection.reduce((sub, item) => sub + Number(item[key]), 0)
}