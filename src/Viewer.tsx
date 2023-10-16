import React, { useEffect, useState } from 'react';
import { Page } from './DocumentStore';
import Markdown from 'react-markdown'

interface ViewerProps {
  pages: Array<Page>;
  currentPage: Page;
  onPrevClick: (url: string) => void;
  onNextClick: (url: string) => void;
}
 

export default function Viewer({ pages, currentPage, onPrevClick, onNextClick}: ViewerProps) {
    const [nborPages, setNborPages] = useState({
        next: null,
        prev: null
    })

    useEffect(() => {
        const target = pages.findIndex(e => e.url == currentPage.url);
        setNborPages({
            next: pages?.[target+1],
            prev: pages?.[target-1],
        })
    }, [pages])


    return (
        <div className="ReactDocument-Viewer">
            <div className="ReactDocument-Content">
                <Markdown>
                    {currentPage.content}
                </Markdown>
            </div>

            <div className="ReactDocument-ButtonGroup">
                {nborPages.prev && <button className="ReactDocument-Button" onClick={onPrevClick}>{nborPages.prev.url}</button>}
                {nborPages.next && <button className="ReactDocument-Button" onClick={onNextClick}>{nborPages.next.url}</button>}
            </div>
        </div>
    );
}
