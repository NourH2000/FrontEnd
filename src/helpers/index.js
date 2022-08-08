import axios from "axios";
export async function getFetcher(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Data could not be fetched!");
  } else {
    return response.json();
  }
}

export async function postFetcher(
  url,
  data,
  options = {
    method: "POST",
    allowed_headers: "Content-Type,Authorization",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }
) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Data could not be posted!");
  } else {
    return response.json();
  }
}
