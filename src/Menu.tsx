import React from 'react';
import { DocumentStore, Page } from './DocumentStore';

interface MenuItemProps {
  page: Page;
  linkAs: any;
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
    onLinkClick(page.url);
    toggleVisibility();
  };

  const ulClasses = `ReactDocument-MenuList ${visible ? 'ReactDocument-MenuList--open' : 'ReactDocument-MenuList--close'}`;

  if (page.children.length > 0) {
    content = (
      <>
        <div>
          <LinkComponent
            onClick={handleLinkClick}
            className={`ReactDocument-MenuItem ${!page.content ? 'ReactDocument-MenuTitle' : ''}`}
            {...linkPropObj}
          >
            {page.title}
          </LinkComponent>
        </div>
        <ul className={ulClasses}>
          {page.children.map((e, index) => (
            <li key={index}>
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

interface MenuProps {
  onLinkClick: (url: string) => void;
  collapsible: boolean;
  store: DocumentStore;
  linkAs: any;
  linkHrefProp: string;
}

export default function Menu({ onLinkClick, collapsible, store, linkAs, linkHrefProp }: MenuProps) {
  return (
    <div className="ReactDocument-Menu">
      {store.get().map(e => (
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
