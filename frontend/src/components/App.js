import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";

function App() {

  return (
    <div className="container sm">
      <Router>
        <Header />
        <ContactsCrudContextProvider>
          <Routes>
          <Route exact path="/" element={<ContactList />}/>
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit" element={<EditContact />} />
          <Route path="/contact/:id" element={<ContactDetails />}/>
          </Routes>
        </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;