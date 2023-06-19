export const sleep = (wait: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(wait)
    }, wait)
  })
}
