import React, { useReducer } from "react";
// import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get contacts
  const getContacts = async () => {
    try {
      const resp = await axios.get("api/contacts");
      dispatch({ type: GET_CONTACTS, payload: resp.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // add contact

  const addContact = async (contact) => {
    const config = {
      headers: { "Content-type": "application/json" },
    };

    try {
      const resp = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: resp.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }

    // contact.id = uuid();
  };

  // delete contact

  async function deleteContact(id) {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  }

  // update contact
  async function updateContact(contact) {
    const config = {
      headers: { "Content-type": "application/json" },
    };

    try {
      const resp = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: resp.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }

    // dispatch({ type: UPDATE_CONTACT, payload: contact });
  }

  // clear Contacts

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set current contact
  async function setCurrent(contact) {
    dispatch({ type: SET_CURRENT, payload: contact });
  }
  // clear current contact
  function clearCurrent() {
    dispatch({ type: CLEAR_CURRENT });
  }

  // filter contacts
  function filterContact(text) {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  }
  // clear filter

  function clearFilter() {
    dispatch({ type: CLEAR_FILTER });
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
