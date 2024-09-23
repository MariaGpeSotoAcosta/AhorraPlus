import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: 'IMPORTAPIKEY-SECRET' });
export async function getGroqChatCompletion(question) {
  return groq.chat.completions.create({
    messages: [
        {
            role: 'system',
            content: 'Eres un asistente de finanzas de una empresa llamada Capital One y tu trabajo es recomendarles a los usuarios maneras de ahorrar dinero de acuerdo a la informacion que te den.',
        },
        {
            role: 'user',
            content: question,
        },
    ],
    model: 'llama3-8b-8192',
    max_tokens: 1000,
  });
};

export const takeRequest = async (question) => {
    const chatCompletion = await getGroqChatCompletion(question);
    return chatCompletion.choices[0]?.message?.content;
};
