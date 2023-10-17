import { useState, useEffect } from "react";

import { Menu, DocumentStore, Viewer, mockData } from "react-documenter";
import { useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css"


export default function App() {
  const navigate = useNavigate();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const newStore = new DocumentStore();
    mockData.forEach((page) => newStore.set(page));
    setStore(newStore);
  }, []);

  if (!store) return "Loading..."

  return (
    <section style={{
                 display: "flex"
             }}>
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
    </section>
  );
}

