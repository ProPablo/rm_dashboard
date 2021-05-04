import { backendURL } from "../env.js";

export const baseURL = (process.env.NODE_ENV === "production") ? "rm.kongroo.xyz/api" : backendURL;

// Standard variation
export function request<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}
