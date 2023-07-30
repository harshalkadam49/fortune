export async function postuserapi(model: any, url: any, method: any) {
  const response = await fetch(url, {
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
