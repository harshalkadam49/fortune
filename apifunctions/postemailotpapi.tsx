export async function postEmailOtp(model: any, url: any, method: any) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(BASE_URL + url, {
    method: method,
    body: JSON.stringify(model),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return response;
  }
}
