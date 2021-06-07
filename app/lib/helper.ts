export function getFloat(num: string | number) {
  return typeof num == "string" ? parseFloat(num) : num;
}