import React from "react";
import user from "../images/user.png";
import { useLocation,Link } from "react-router-dom"

const ContactDetails = () => {
    const location = useLocation();
    const {name,email,number}=location.state.contact;
    return (
    <div className="card deetsouter">
        <div className="card deetsinner mx-auto">
            <div className="text-center">
                <img className= "card-img-top"  src={user} alt="user"></img>
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{number}</p>
                <p className="card-text">{email}</p>
            </div>
        </div>
        <div className="text-center my-3">
      <Link to="/">
        <button className="btn btn-primary">
          Back to Contact List
        </button>
      </Link>
    </div>
    </div>
  );
};

export default ContactDetails;