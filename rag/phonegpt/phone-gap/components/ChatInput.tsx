"use client";
import {
    Input
} from '@/components/ui/input'
import {
    Button
} from '@/components/ui/button'
import {
    ArrowUp
} from 'lucide-react'

interface ChatInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default  function ChatInput({
    input,
    handleInputChange,
    handleSubmit,
}:ChatInputProps) {
    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                onChange={handleInputChange}
                value={input}
                placeholder="Ask me someing about phone..."
             />
             <Button >
                <ArrowUp />
                <span className='sr-only'>Submit</span>
             </Button>
        </form>
    )
}
