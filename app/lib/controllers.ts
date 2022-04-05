import { backendURL } from "../env.js";
// process.env.NODE_ENV = "production"
export const baseURL = process.env.NODE_ENV === "production" ? "https://rm.kongroo.xyz/api" : backendURL;

export const MEDIA_URL = process.env.NODE_ENV === "production" ? "https://rm.kongroo.xyz" : baseURL;

export const networkTimeout = 3000;

// Standard variation
export function request<T>(url: string): Promise<T> {
  return fetchWithTimeout(url).then(response => {
    if (!response.ok) {
      response.json().then(body => {
        throw new Error(body.message)
      }).catch((e) => {
        throw new Error("Server not found or no connection");
      })
    }
    return response.json() as Promise<T>
  })
    .catch(e => { 
      console.log(e)
      if (e.name == "AbortError") {
        throw new Error("Network request timed out")
      }
      throw e 
    })
}

async function fetchWithTimeout(resource: RequestInfo, options?: RequestInit) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), networkTimeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}
