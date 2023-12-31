import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContacInfo = (props) => {
  const {removeContactHandler} = useContactsCrud();
  const { _id, name,number, email } = props.contact;

  const deleteContact = (contact) => {
    removeContactHandler(contact);
  }

  return (
    <div className="list-group-item mb-1">
      <img className="avatar" src={user} alt="Avatar" />
      <div className="content">
        <Link to={`/contact/${_id}`} state={{contact:props.contact}} style={{textDecoration:"none"}}>
          <div><strong>{name}</strong></div>
        </Link>
        <div>{number}</div>
          <div>{email}</div>
      </div>
      <div className="action-buttons">
        <Link to={`/edit`} state={{contact: props.contact}}>
        <i
          className="bi bi-pencil"
          ></i>
        </Link>
        <i
          className="bi bi-trash"
          onClick={() => deleteContact(props.contact)}
          ></i>
      </div>
    </div>
  );
};

export default ContacInfo;