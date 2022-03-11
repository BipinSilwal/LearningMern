import React, { useState } from "react";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/appContext";
import Alert from "../../components/Alert";
import Wrapper from '../../assets/wrappers/DashboardFormPage';


const Profile = () => {
  const { user, isLoading, displayAlert, showAlert, updateUser } = useAppContext();

  const [userName, setName] = useState(user?.userName);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ userName, email, lastName, location, alertText:"User Updated Successfully!!" });
  };

  return (
    <>
      <Wrapper className="full-page">
        <form className="form" onSubmit={handleSubmit}>
          <h3>profile</h3>
          
          {showAlert && <Alert/>}

          <div className="form-center">
            <FormRow
              type="text"
              name="userName"
              value={userName}
              handleChange={(e) => setName(e.target.value)}
            />
             <FormRow
              type="text"
              labelText='LastName'
              name="lastName"
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
            />
            <FormRow
              type="email"
              name="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
           
            <FormRow
              type="text"
              name="location"
              value={location}
              handleChange={(e) => setLocation(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              {isLoading ? 'Please Wait....' : 'save changes'}
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default Profile;
