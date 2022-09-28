import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function handler(event, context) {
  console.log(event.httpMethod);
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = JSON.parse(event.body);
  console.log(params);


  try{
   const {data, error} = await supabase.from("WinnerNames")
              .insert({ user_data: params})

  }catch(error){
return {
  statusCode: 400,
  body: error
}
  
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      name: userName 
    })
  }
}
