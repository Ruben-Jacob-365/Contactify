import React,{useEffect} from "react";
import ContactInfo from "./ContactInfo";
import {NavLink} from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactList = (props) => {
  console.log(props);
  const {contacts,getContacts,search,searchResults,searchHandler} = useContactsCrud();

  useEffect(() => {
    getContacts();
  });

  const onSearch =(e) => {
    searchHandler(e.target.value);
  }

  const renderContactList = (search.length<1 ? contacts : searchResults).map((contact) => {
    return (
      <ContactInfo
        contact={contact}
        key={contact.id}
      />
    );
  });

  return (
    <div className="main">
      <h2 className="mx-auto">Contact List
        <NavLink to="/add">
          <button className="btn btn-outline-success float-end btn-sm"><strong>Add Contact</strong></button>
        </NavLink>
      </h2>  
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
        </div>
        <input type="text" className="form-control" value={search} onChange={(e) => onSearch(e)} placeholder="Search..." />
        </div>
      {renderContactList.length>0 ? (<div className="list-group">{renderContactList}</div>):(<p>No Contacts</p>)}
      </div>
  );
};

export default ContactList;