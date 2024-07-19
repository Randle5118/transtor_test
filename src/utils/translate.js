// src/translate.js

import OpenAI from "openai";

const open_ai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

async function main(text, targetLanguage) {
    const completion = await open_ai.chat.completions.create({
        messages: [
            {
                "role": "system",
                "content": `your task is to translate it into ${targetLanguage}.`
            },
            {
                "role": "user",
                "content": `${text}`
            }
        ],
        model: "gpt-4o-mini",
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;

}

export default main;


