import React from 'react';
import { default as DocumentStore, Page } from '../DocumentStore';

export interface MenuItemProps {
  page: Page;
  linkAs: any;
  linkHrefProp: string;
  onLinkClick: (url: string) => void;
  collapsible: boolean;
}

export interface MenuProps {
  onLinkClick: (url: string) => void;
  collapsible: boolean;
  store: DocumentStore;
  linkAs: any;
  linkHrefProp: string;
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

    const handleLinkClick = (event: any) => {
    event.preventDefault();
    onLinkClick(page.url);
    toggleVisibility();
  };

  const ulClasses = `ReactDocument-MenuList ${visible ? 'ReactDocument-MenuList--open' : 'ReactDocument-MenuList--close'}`;

  if (page.children.length > 0) {
    content = (
      <>
        <div className="ReactDocument-MenuItem">
          <LinkComponent
            onClick={handleLinkClick}
            className={`${!page.content ? 'ReactDocument-MenuTitle' : ''}`}
            {...linkPropObj}
          >
            {page.title}
          </LinkComponent>
        </div>
        <ul className={ulClasses}>
          {page.children.map((e, index) => (
            <li key={index} className="ReactDocument-MenuItem">
              <MenuItem
                page={e}
                linkAs={linkAs}
                linkHrefProp={linkHrefProp}
                onLinkClick={onLinkClick}
                collapsible={collapsible}
              />
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
        {page.title}
      </LinkComponent>
    );
  } else {
    content = null;
  }

  return <div>{content}</div>;
}


export default function Menu({ onLinkClick, collapsible, store, linkAs, linkHrefProp }: MenuProps) {
  return (
    <div className="ReactDocument-Menu">
     {store.get().map((e: Page) => (
        <MenuItem
          key={e.url}
          page={e}
          linkAs={linkAs}
          linkHrefProp={linkHrefProp}
          onLinkClick={onLinkClick}
          collapsible={collapsible}
        />
      ))}
    </div>
  );
}
