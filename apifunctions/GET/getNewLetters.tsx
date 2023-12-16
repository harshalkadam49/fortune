export async function getNewLettersapi(url: any, method: any) {
   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
   const response = await fetch(BASE_URL + url, {
     method: method,
     headers: { "Content-Type": "application/json" },
   });
 
   const data = await response.json();
   return data;
 }
 