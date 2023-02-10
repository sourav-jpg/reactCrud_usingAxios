import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ID, setID] = useState(null);

  console.log("firstN-->", firstName);
  console.log("lastN-->", lastName);

  const url = "https://63e4a1368e1ed4ccf6e29538.mockapi.io/Crud";
  const sendDataToApi = () => {
    axios
      .put(`${url}/${ID}`, {
        firstName,
        lastName,
      })
      .then(() => {
        navigate("/read");
      });
  };

  //to get data from the Local Storage
  useEffect(() => {
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("lastName"));
    setID(localStorage.getItem("ID"));
  }, []);

  return (
    <div>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input
            name="fname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            name="lname"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Button color="blue" type="submit" onClick={sendDataToApi}>
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Update;
