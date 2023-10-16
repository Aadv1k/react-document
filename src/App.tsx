import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import DocumentStore from './DocumentStore';
import Menu from './Menu';
import Viewer from './Viewer'; 
import mockData from './mockData';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const newStore = new DocumentStore();
    mockData.forEach(page => newStore.set(page));
    setStore(newStore);
  }, []);

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <section style={{
        display: "flex",
        width: "80%",
        margin: "0 auto"
    }}>
      <Menu collapsible={false} store={store} linkAs="a" linkHrefProp="href" onLinkClick={navigate} />
      <Routes>
        {store.getNormalized().map((page, index) => (
          <Route key={index} path={page.url} element={<Viewer
                                                          pages={store.getNormalized()}
                                                          currentPage={page}
                                                          onPrevClick={navigate}
                                                          onNextClick={navigate}
                                                      />} />
        ))}
      </Routes>
    </section>
  );
}
