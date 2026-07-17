export function devDelay() {
  return process.env.NODE_ENV === "development"
    ? new Promise((resolve) => setTimeout(resolve, 5000))
    : Promise.resolve();
}
