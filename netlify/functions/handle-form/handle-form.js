import { parse } from "querystring";
import fetch from 'node-fetch';

export async function handler(event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = parse(event.body);
  const { name } = params
  console.log(params);
  const userName = { name };

  const IP_API = 'https://api.ipify.org?format=json'

  const response = await fetch(IP_API)
  const data = await response.json()

  return {
    statusCode: 200,
    body: JSON.stringify({
      data
    })
  }
}
