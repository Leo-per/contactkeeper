import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

function ContactFilter() {
  const contactContext = useContext(ContactContext);
  const { filtered, filterContact, clearFilter } = contactContext;

  const text = useRef();

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, [filtered]);

  const handleOnChange = (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      filterContact(text.current.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      {" "}
      <input
        ref={text}
        type="text"
        placeholder="filter Contacts..."
        onChange={handleOnChange}
      />
    </form>
  );
}

export default ContactFilter;
