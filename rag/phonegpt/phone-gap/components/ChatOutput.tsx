"use client";
import type {
    Message
} from 'ai'

interface ChatOutputProps {
    messages: Message[];
    status: string;

}

export default function ChatOutput({
    messages,
    status
}:ChatOutputProps) {
    return (
        <>
            output
        </>
    )
}
