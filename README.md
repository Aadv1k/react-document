# React Documenter

React Components for Building Documentation

- **Don't Use This If:** You need a fast, concise, or fun documentation solution. Static Site Generators (SSGs) are more suitable for such cases.

- **Use This If:** You require your documentation to share the same global state as your UI.

![Preview](./public/preview.gif)

## Components

### Menu

A Nestable Sidebar Menu

- `collapsible`: (Boolean) Defines if clicking on a parent entry collapses its children.
- `store`: (DocumentStore) Defines the content for the menu to render.
- `linkAs`: (String or React Node) Pass a component or a tag to be used as the link, e.g., `a` or `<Link />`.
- `linkHrefProp`: (String) The prop representing the "href" on the link component, e.g., `href` or `to`.
- `onLinkClick`: (Function: (url: string) => void) Defines what to do when a link is clicked.

### Viewer

The Viewer Component with Adjacent Neighbor Navigation

- `pages`: (Array<FlatPage>) An array of `{ url: string, content: string }`.
- `currentPage`: (FlatPage) The current page, used to determine neighbor navigation.
- `onPrevClick`: (Function: (url: string) => void) Invoked when clicking the "previous page."
- `onNextClick`: (Function: (url: string) => void) Invoked when clicking the "next page."

### DocumentStore

**(Not a Component)** - A Class Used to Store Content

- `DocumentStore.get()`: Returns an `Array<Page>`.
- `DocumentStore.getNormalized()`: Flattens all `Page` and their children into a 1D array of `FlatPage`.
- `DocumentStore.set(Page)`: Sets a page with its corresponding URL into the map.

## Styling

A documentation is made up of several components and classes. Check out [example/src/App.css](./example/src/App.css) for reference.

![CSS Guide](./public/css-guide-react-document.png)

## Example

Here is an example of how you would use this with [react-router](https://reactrouter.com/en/main).

You can also check this as a working example with styles in [example/](./example/src).

```typescript
import { Menu, DocumentStore, Viewer, mockData } from "react-scribe";
import { useNavigate, Routes, Route } from "react-router";

import "./App.css"

export default function App() {
  const navigate = useNavigate();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const newStore = new DocumentStore();
    mockData.forEach((page) => newStore.set(page));
    setStore(newStore);
  }, []);

  return (
    <>
      <Menu
        collapsible={false}
        store={store}
        linkAs="a"
        linkHrefProp="href"
        onLinkClick={navigate}
      />
      <Routes>
        {store.getNormalized().map((page, index) => (
          <Route
            key={index}
            path={page.url}
            element={
              <Viewer
                pages={store.getNormalized()}
                currentPage={page}
                onPrevClick={navigate}
                onNextClick={navigate}
              />
            }
          />
        ))}
      </Routes>
    </>
  );
}
```