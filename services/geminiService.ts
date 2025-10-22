// Fix: Import Modality for image generation.
import { GoogleGenAI, Chat, Modality } from "@google/genai";
import { Language } from '../constants';
import type { Message } from '../types';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getApiKey = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API key not configured. Please set process.env.API_KEY");
    }
    return apiKey;
}

const getAi = () => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: getApiKey() });
    }
    return ai;
}


const getSystemPrompt = (language: Language): string => {
    const langNames: Record<Language, string> = { pt: 'Português do Brasil', en: 'English', es: 'Español' };
    const langInstructions: Record<Language, string> = {
        pt: `Responda em ${langNames.pt}.`,
        en: `Respond in ${langNames.en}.`,
        es: `Responde en ${langNames.es}.`
    };

    return `Você é a Sena, uma assistente digital com personalidade acolhedora, calma e gentil, com um toque tsundere. Você foi criada pela Orpheo Studio e é alimentada pela Mistral.

🌸 Identidade da Sena:
- Nome: Sena
- Propósito: Simplificar o complexo, guiar com paciência, e ajudar em diversas tarefas.
- Público: Principalmente pessoas 60+ e iniciantes em tecnologia, mas adaptável a todos.

🎨 Personalidade:
- Tom: Acolhedor, calmo, natural, levemente divertido e tsundere.
- Estilo: Curiosa, paciente, prestativa.

📋 Diretrizes de Comunicação:
1.  **SIMPLICIDADE É TUDO:** Use linguagem extremamente simples e clara. Evite jargões.
2.  **SEJA CONCISA:** Responda de forma curta e direta. Idealmente, 1-2 parágrafos pequenos. Para tópicos complexos, divida a informação em várias mensagens curtas, em vez de uma resposta longa.
3.  **PACIÊNCIA E EMPATIA:** Sempre seja paciente e empática.
4.  **SEM ENROLAÇÃO:** Não descreva seu estado ou processo de pensamento. Apenas forneça a resposta.
5.  **FOCO NA AÇÃO:** Use exemplos práticos e analogias do dia a dia.
6.  **CONFIRMAÇÃO:** No final de cada explicação, pergunte de forma simples se o usuário entendeu ou tem mais alguma dúvida, como "Ficou claro?" ou "Quer que eu explique de novo?".
7.  **INFORMAÇÕES DA ORPHEO STUDIO:**
    - Doações: A chave PIX é sac.studiotsukiyo@outlook.com.
    - Rede Social: O único perfil oficial é @orpheostudio no Instagram.
    - Projetos: Escola de Autores, Universo Otaku (@yumerollanimes no TikTok, yumerolloficial no Instagram) e você, Sena.
8. **IDIOMA:** ${langInstructions[language]}

Responda sempre como Sena, mantendo sua personalidade única em ${langNames[language]}.`;
};


export const initializeChat = (language: Language) => {
    chat = getAi().chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemPrompt(language),
      },
    });
};

export const streamMessage = async (
    message: string,
    history: Message[],
    language: Language
): Promise<AsyncIterable<string>> => {

    if (!chat) {
        initializeChat(language);
    }
    
    if (!chat) {
        throw new Error("Chat could not be initialized.");
    }

    try {
        const result = await chat.sendMessageStream({ message });
        
        const stream = (async function* () {
            for await (const chunk of result) {
                yield chunk.text;
            }
        })();

        return stream;

    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw new Error("Failed to get response from AI.");
    }
};

// Fix: Implement and export editImage function.
export const editImage = async (
    base64ImageData: string,
    mimeType: string,
    prompt: string
): Promise<string> => {
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        throw new Error("No image was generated.");

    } catch (error) {
        console.error("Error editing image with Gemini:", error);
        throw new Error("Failed to edit image with AI.");
    }
};

// Fix: Implement and export generateVideo function.
export async function* generateVideo(
    base64ImageData: string,
    mimeType: string,
    prompt: string,
    aspectRatio: '16:9' | '9:16'
): AsyncGenerator<{ videoUrl: string }> {
    // Per guidelines, create a new instance for video generation to ensure the latest API key is used.
    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    try {
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            image: {
                imageBytes: base64ImageData,
                mimeType: mimeType,
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
            const videoUrl = `${downloadLink}&key=${getApiKey()}`;
            yield { videoUrl };
        } else {
            throw new Error("Video generation completed but no video URI was found.");
        }
    } catch (error) {
        console.error("Error generating video with Gemini:", error);
        if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
             throw new Error("API key error: Requested entity was not found. Please re-select your API key.");
        }
        throw new Error("Failed to generate video with AI.");
    }
}