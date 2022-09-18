import { parse } from "querystring";
import $ from 'jquery';

export async function handler(event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = parse(event.body);
  const { name } = params
  console.log(params);
  const userName = { name }

  var json = $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
        return json;
      }
    );

  return {
    statusCode: 200,
    body: JSON.stringify(json),
  };
}
