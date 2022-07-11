import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./containers/Home";
import { Edit } from "./containers/Edit";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const App = () => (
  <>
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Edit />} path="/new" />
            <Route element={<Edit />} path="/edit/:id" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </>
);

export default App;
