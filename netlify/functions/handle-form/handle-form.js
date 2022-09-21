import { parse } from "querystring";
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';



const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function handler(event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = parse(event.body);
  const { name } = params
  console.log(params);
  const userName = { name };


  try{
   const {data, error} = await supabase.from("WinnerNames")
              .insert({ user_data: name})

  }catch(error){
return {
  statusCode: 200,
  body: error
}
  
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      userName 
    })
  }
}
