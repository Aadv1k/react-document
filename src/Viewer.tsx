import React from 'react';
import { Page } from './DocumentStore';

interface ViewerProps {
    page: Page;
}

export default function Viewer({ page }: ViewerProps) {
    return (
        <h1>{page.content}</h1>
    )
}
