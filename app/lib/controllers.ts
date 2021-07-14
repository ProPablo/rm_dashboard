import { backendURL } from "../env.js";
process.env.NODE_ENV = "production"
export const baseURL = process.env.NODE_ENV === "production" ? "https://rm.kongroo.xyz/api" : backendURL;

export const MEDIA_URL = process.env.NODE_ENV === "production" ? "https://rm.kongroo.xyz" : baseURL;

// Standard variation
export function request<T>(url: string): Promise<T> {
  // console.log(url)
  return fetch(url).then(response => {
    if (!response.ok) {
      response.json().then(body => {
        throw new Error(body.message)
      }).catch((err) => {
        throw new Error("Server not found or no connection");
      })
    }
    return response.json() as Promise<T>
  })
    .catch(e => { throw e })
}
