import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import DocumentStore from './DocumentStore';
import Menu from './Menu';
import Viewer from './Viewer'; // Assuming you have a Viewer component
import mockData from './mockData';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  const [store, setStore] = useState(null); // Initially, set the store to null

  useEffect(() => {
    // Load the store when the component mounts
    const newStore = new DocumentStore();
    mockData.forEach(page => newStore.set(page));
    setStore(newStore); // Set the store when it's ready
  }, []);

  if (!store) {
    // Display a loading message or spinner while the store is loading
    return <div>Loading...</div>;
  }

  return (
    <>
      <Menu collapsible={false} store={store} linkAs="a" linkHrefProp="href" onLinkClick={navigate} />
      <Routes>
        {store.getNormalized().map((page, index) => (
          <Route key={index} path={page.url} element={<Viewer page={page} />} />
        ))}
      </Routes>
    </>
  );
}
