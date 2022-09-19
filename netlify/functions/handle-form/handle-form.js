import { parse } from "querystring";

export async function handler(event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = parse(event.body);
  const { name } = params
  console.log(params);
  const userName = { name }

  return {
    statusCode: 200,
    body: JSON.stringify(userName),
  };
}
