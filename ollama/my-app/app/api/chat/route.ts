import type { NextResponse } from "next/server";
import {
    Message,
    ChatRequest,
    ChatResponse,
} from "@/types/chat";


const OLLAMA_API_URL = 'http://localhost:11434/api/chat';
const MODEL_NAME = 'deepseek-r1:1.5b';

export async function POST(request:NextResponse) {
    try {
        const body: {messages:Message[]} = await request.json();
        const ollamaRequestBody: ChatRequest = {
            model: MODEL_NAME,
            messages: body.messages,
            stream: false,
        }
        const response = await fetch(OLLAMA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ollamaRequestBody),
        })

        if(!response.ok) {
            const erroeText = await request.text();
            return Response.json({
                error: `Ollama API ERROR`
            })
        }

        const OllamaData: ChatResponse = await response.json();
        return Response.json(OllamaData);
    }catch(err) {
        console.error('Ollama API Error:', err);
        return Response.json({
            status: 500
        })
    }
}
