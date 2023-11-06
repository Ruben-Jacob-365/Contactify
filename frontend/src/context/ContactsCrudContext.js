import { createContext, useContext,useState } from "react";
// import api from "../api/contacts"
import { uuid } from "uuidv4";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {
    const [contacts,setContacts] = useState([]);
    const [search,setSearch] = useState("");
    const [searchResults,setSearchResults] = useState([]);

    const getContacts = async () => {
        try {
            const response = await fetch("http://localhost:5000/contacts");
            const data = await response.json();
            setContacts(data);
        } catch(error) {
            console.error("Error fetching contacts: ",error);
        }
    };

    const addContactHandler = async (contact) => {
        try {
            const response = await fetch("http://localhost:5000/contacts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(contact),
            });
            // console.log(response);
            const data = await response.json();
            setContacts([...contacts,data]);
        } catch(error) {
            console.error("Error adding contact: ",error);
        }
    };

    const editContactHandler = async (contact) => {
        // console.log(contact._id);
        
        try {
            const response = await fetch(`http://localhost:5000/contacts/${contact._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(contact),
            }
        );
        const data = await response.json();
        console.log("Api edit calls: ",data);
        setContacts((prevContacts) => 
            prevContacts.map((c) => (c.id === data.id ? data: c))
        );
        } catch(error) {
            console.error("Error updating contact: ",error);
        }
    };

    const searchHandler = (search) => {
        setSearch(search);
        if(search !== ""){
            const newContactList = contacts.filter((contact) => {
                return Object.values(contact).join(" ").toLowerCase().includes(search.toLowerCase());
            });
            setSearchResults(newContactList);
        }
        else {
            setSearchResults(contacts);
        }
    }

    const removeContactHandler = async (contact) => {
        // console.log("TO DELETE",contact._id);
        // const {_id} = contact._id;
        try {
            const response = await fetch(`http://localhost:5000/contacts/${contact._id}`, {
                method: "DELETE",
            });

            setContacts((prevContacts) => prevContacts.filter((c) => c._id !==contact._id));

            // getContacts();
        } catch(error) {
            console.error("Error deleting contact: ",error);
        }
    };

    const value={
        contacts,
        search,
        searchResults,
        getContacts,
        removeContactHandler,
        addContactHandler,
        editContactHandler,
        searchHandler,
    }
    return <contactsCrudContext.Provider value={value}>
        {children}
    </contactsCrudContext.Provider>
}

export function useContactsCrud() {
    return useContext(contactsCrudContext);
};