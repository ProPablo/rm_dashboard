export const SERVER_URL = process.env.NODE_ENV === "production" ? "https://rm.kongroo.xyz/api" : "http://localhost:3001";

export const IMAGES_URL = process.env.NODE_ENV === "production" ? "" : SERVER_URL;
// export const IMAGES_URL = process.env.NODE_ENV === "production" ? `${window.location.origin}` : SERVER_URL;