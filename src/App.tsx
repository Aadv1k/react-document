import React from 'react';
import "./App.css"

import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

class DocumentStore {
  pages: Map<string, Page>;

  constructor() {
    this.pages = new Map();
  }

  set(page: Page): void {
    this.pages.set(page.url, page);
  }

  get(): Page[] {
    return Array.from(this.pages.values());
  }
}

const store = new DocumentStore();
store.set({
  title: "Get Started",
  url: "/get-started",
  content: null,
  children: [
    {
      title: "Introduction",
      url: "/get-started/introduction",
      content: "<p>Introduction content</p>",
      children: [
        {
          title: "Getting Started",
          url: "/getting-started",
          content: "<p>Getting started content</p>",
          children: [],
        },
      ],
    },
    {
      title: "System Requirements",
      url: "/get-started/system-requirements",
      content: "<p>System requirements content</p>",
      children: [],
    },
  ],
});

store.set({
  title: "Installation",
  url: "/installation",
  content: null,
  children: [
    {
      title: "Prerequisites",
      url: "/installation/prerequisites",
      content: "<p>Prerequisites content</p>",
      children: [
        {
          title: "Installing Dependencies",
          url: "/installation/prerequisites/installing-dependencies",
          content: "<p>Installing dependencies content</p>",
          children: [],
        },
      ],
    },
    {
      title: "Installation Steps",
      url: "/installation/installation-steps",
      content: "<p>Installation steps content</p>",
      children: [],
    },
  ],
});

interface Page {
  title: string;
  url: string;
  content: string;
  children: Array<Page>;
}

interface MenuItemProps {
  page: Page;
  linkAs: any; // Change this type to 'any' since we use both 'Link' and 'a'
  linkHrefProp: string;
  onLinkClick: (url: string) => void;
  collapsible: boolean;
}

function MenuItem({ page, linkAs, linkHrefProp, onLinkClick, collapsible }: MenuItemProps) {
  const LinkComponent = linkAs;
  const [visible, setVisible] = React.useState(!collapsible);

  let content;

  const linkPropObj = { [linkHrefProp]: page.url };

  const toggleVisibility = () => {
    if (!collapsible) return;
    setVisible(!visible);
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    toggleVisibility();
    if (page.content) {
      onLinkClick(page.url);
    }
  };

  const ulClasses = `ReactDocument-MenuList ${visible ? 'ReactDocument-MenuList--open' : 'ReactDocument-MenuList--close'}`;

  if (page.children.length > 0) {
    content = (
      <>
        <div>
          <LinkComponent
            onClick={handleLinkClick}
            className={`ReactDocument-MenuItem ${!page.content ? "ReactDocument-MenuTitle" : ""}`}
            {...linkPropObj}
          >
            {page.title}
          </LinkComponent>
        </div>
        <ul className={ulClasses}>
          {page.children.map((e, index) => (
            <li key={index}>
              <MenuItem page={e} linkAs={Link} linkHrefProp="to" onLinkClick={onLinkClick} collapsible={collapsible} />
            </li>
          ))}
        </ul>
      </>
    );
  } else if (page.content) {
    content = (
      <LinkComponent
        onClick={handleLinkClick}
        className="ReactDocument-MenuItem"
        {...linkPropObj}
      >
        {page.title} -- No children, only content
      </LinkComponent>
    );
  } else {
    content = null;
  }

  return <div>{content}</div>;
}

interface MenuProps {
  onLinkClick: (url: string) => void;
  collapsible: boolean;
}

function Menu({ onLinkClick, collapsible }: MenuProps) {
  return (
    <div className="ReactDocument-Menu">
      {store.get().map(e => (
        <MenuItem key={e.url} page={e} linkAs={Link} linkHrefProp="to" onLinkClick={onLinkClick} collapsible={collapsible} />
      ))}
    </div>
  );
}


interface FlatPage {
  url: string;
  content: string;
}

function normalize(pages: Page[]): FlatPage[] {
  const flatPages: FlatPage[] = [];

  function flatten(page: Page, parentUrl = '') {
    const pageUrl = page.url;

    if (page.content) {
      flatPages.push({ url: pageUrl, content: page.content });
    }

    if (page.children && page.children.length > 0) {
      for (const childPage of page.children) {
        flatten(childPage, pageUrl);
      }
    }
  }

  for (const page of pages) {
    flatten(page);
  }

  return flatPages;
}


function App() {
  const flatPages = normalize(store.get());

  return (
    <BrowserRouter>
      <Menu collapsible={true} onLinkClick={(url) => console.log(url)} />
      <Routes>
        {flatPages.map((page, index) => (
          <Route
            key={index}
            path={page.url}
            element={<h1>{page.content}</h1>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
