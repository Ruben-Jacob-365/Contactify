import { createContext, useContext,useState } from "react";
import api from "../api/contacts"
import { uuid } from "uuidv4";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {
    const [contacts,setContacts] = useState([]);
    const [search,setSearch] = useState("");
    const [searchResults,setSearchResults] = useState([]);

    const getContacts = async () => {
        const response = await api.get("/contacts");
        if(response.data){
        const sortedContactList = response.data.sort((a,b) => a.name.localeCompare(b.name));
        setContacts(sortedContactList);
        }
    };

    const addContactHandler = async (contact) => {
        const request = {
          id: uuid(),
          ...contact,
        };
        const response = await api.post("/contacts", request);
        setContacts([...contacts, response.data]);
    };

    const editContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`,contact);
        const {id} = response.data;
        setContacts(contacts.map((contact) => {
          return contact.id === id ? {...response.data} : contact;
        })
        );
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

    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`);
        const newContactList = contacts.filter((contact) =>  contact.id !== id
        );
    
        setContacts(newContactList);
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