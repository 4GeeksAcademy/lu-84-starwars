import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
  // Use a sensible default if BASENAME is not defined
  const basename = process.env.REACT_APP_BASENAME || "";

  return (
    <div className="layout-container">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/single/:category/:theid" element={<Single />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

// Separate NotFound Component
const NotFound = () => (
  <div className="not-found">
    <h1>Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
  </div>
);

export default injectContext(Layout);