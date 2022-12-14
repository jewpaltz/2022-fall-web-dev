import { myFetch } from "@/services/myFetch";

const OPEN_AI_KEY = import.meta.env.VITE_OPEN_AI_KEY;

export function gptApi(url: string, data?: any, method?: string, headers?: HeadersInit){
    headers = {
        "Authorization": "Bearer " + OPEN_AI_KEY,
    }
    return myFetch<GPTResponse>(url, data, method, headers)
}

export async function createDescription(title: string){
    // get a description from the gpt rest services
    const result  = await gptApi("https://api.openai.com/v1/completions", {
        "model": "text-davinci-003",
        "prompt": `Create description for "${title}" to be used on an ecommerce site` ,
        "max_tokens": 45,
        "temperature": 0.18
      })
    return result?.choices[0].text?.trim();
}

//  I generated the following interface by pasting the response from OpenAi into https://transform.tools/json-to-typescript
//  It's just a TypeScript description of what a response from OpenAi looks like.
//  I could have just used myFetch<any> instead. But then I wouldn't get the benefits of TypeScript.
interface GPTResponse {
    id: string
    object: string
    created: number
    model: string
    choices: {
        text: string
        index: number
        logprobs: any
        finish_reason: string
      }[]
    usage: {
        prompt_tokens: number
        completion_tokens: number
        total_tokens: number
      }
  }
  