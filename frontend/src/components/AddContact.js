import React,{useState} from "react";
import {NavLink} from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const AddContact = () => {
  const [name,setName] = useState("");
  const [number,setNumber] = useState("");
  const [email,setEmail] = useState("");
  const {addContactHandler} = useContactsCrud();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || (number === "" && email==="")) {
      alert("Name and atleast one of number and email are mandatory!");
      return;
    }
    addContactHandler({name,number,email});
    setName("");
    setNumber("");
    setEmail("");
  };
    return (
      <div className="addcontactbox border border-secondary text-center">
        <h2>Add Contact</h2>
        <form className="form" onSubmit={add}>
          <div className="field mx-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field mx-2">
            <label htmlFor="number">Number</label>
            <input
              type="text"
              name="number"
              className="form-control"
              placeholder="Enter Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="field mx-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-2 d-flex">
            <button className="btn btn-success mx-2">Add</button>
            <NavLink to="/">
            <button className="btn btn-danger">Go Back</button>
            </NavLink>
          </div>
        </form>
      </div>
    );
}

export default AddContact;