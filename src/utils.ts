export function timeToInt(timeStr: string) {
  return parseInt(timeStr.replace(':', ''), 10);
}