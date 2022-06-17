import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ContactFilter from "../contacts/ContactFilter";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";
import setAuthToken from "../../utils/setAuthToken";

function Home() {
  const authContext = useContext(AuthContext);

  // useEffect(() => authContext.loadUser(), []);

  // useEffect(() => console.log(authContext.loadUser), []);

  useEffect(() => {
    async function load() {
      const response = await authContext.loadUser();
      // console.log(response);
      return response;
    }
    load();
  }, []);

  return (
    <Fragment>
      <div className="grid-2">
        <div>
          <ContactForm />
        </div>
        <div>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
