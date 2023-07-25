import React from 'react';
import './App.css';
import {Device} from "./components/device";
import Header from "./header/header";
import Footer from "./footer/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Device></Device>
      <Footer />
    </div>
  );
}

export default App;
