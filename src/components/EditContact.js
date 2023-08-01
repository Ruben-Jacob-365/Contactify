import React,{useState} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const EditContact = () => {
  const location = useLocation();
  const {id,name,number,email} = location.state.contact;
  const [newName,setNewName] = useState(name);
  const [newNumber,setNewNumber] = useState(number);
  const [newEmail,setNewEmail] = useState(email);
  const navigate = useNavigate();
  const {editContactHandler} = useContactsCrud();

  const update = (e) => {
    e.preventDefault();
    if (newName === "" || (newNumber === "" && newEmail==="")) {
      alert("Name and atleast one of number and email are mandatory!");
      return;
    }
    editContactHandler({id,name:newName,number:newNumber,email:newEmail});
    setNewName("");
    setNewNumber("");
    setNewEmail("");
    navigate("/");
  };
    return (
      <div className="addcontactbox border border-secondary text-center">
        <h2>Edit Contact</h2>
        <form className="form" onSubmit={update}>
          <div className="field mx-2">
            <label for="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="field mx-2">
            <label for="number">Number</label>
            <input
              type="text"
              name="number"
              className="form-control"
              placeholder="Enter Number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>
          <div className="field mx-2">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="py-2 d-flex">
            <button className="btn btn-success mx-2">Update</button>
          </div>
        </form>
      </div>
    );
}

export default EditContact;