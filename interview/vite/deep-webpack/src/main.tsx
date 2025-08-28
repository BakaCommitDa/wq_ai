import React from 'react';
import {
    createRoot
} from 'react-dom/client';
import Hello from './hello.tsx'
import './main.css'

createRoot(
    document.getElementById('app')
).render(
    <Hello />
)