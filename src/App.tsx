import React from 'react';
import "./App.css"

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
          url: "/get-started/introduction/getting-started",
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
  linkAs: string;
  linkHrefProp: string;
  onLinkClick: (url: string) => void;
}

function MenuItem({ page, linkAs, linkHrefProp, onLinkClick }: MenuItemProps) {
  const LinkComponent = linkAs; 
  const [visible, setVisible] = React.useState(false);

  let content;

  const linkPropObj = { [linkHrefProp]: page.url };

  if (page.children.length > 0) {
    content = (
      <>
        <div>
            <LinkComponent onClick={(event) => {
                event.preventDefault();
                setVisible(!visible)
                if (!page.content) return;
                onLinkClick(page.url);
            }} className={`ReactDocument-MenuItem ${!page.content ? "ReactDocument-MenuTitle": ""}`} {...linkPropObj}>{page.title}</LinkComponent>
        </div>
        <ul className="ReactDocument-MenuList" style={{
            display: visible ? "block" : "none"
        }}>
          {page.children.map((e, index) => (
            <li key={index}>
              <MenuItem page={e} linkAs={linkAs} linkHrefProp={linkHrefProp} />
            </li>
          ))}
        </ul>
      </>
    );
  } else if (page.content) {
    content = <LinkComponent className="ReactDocument-MenuItem" {...linkPropObj}>{page.title} -- No children, only content</LinkComponent>;
  } else {
    content = null;
  }

  return <div>{content}</div>;
}

interface MenuProps {
  onLinkClick: (url: string) => void;
}

function Menu() {
  return (
    <div className="ReactDocument-Menu">
      {store.get().map(e => (
        <MenuItem key={e.url} page={e} linkAs="a" linkHrefProp="href" />
      ))}
    </div>
  );
}

function App() {
  return (
      <Menu onLinkClick={(url) =>  console.log(url)} />
  )
}

export default App;
