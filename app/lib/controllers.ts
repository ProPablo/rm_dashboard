import { backendURL } from "../env.js";

export const baseURL = (process.env.NODE_ENV === "production") ? "https://rm.kongroo.xyz/api" : backendURL;

export const MEDIA_URL = process.env.NODE_ENV === "production" ? "https://rm.kongroo.xyz" : baseURL;

// Standard variation
export function request<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      //TODO: fix if nginx error or if server not found
      response.json().then(body => { throw new Error(body.message) })
    }
    return response.json() as Promise<T>
  })
}
