import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "semantic-ui-react";

function Read() {
  const navigate = useNavigate();
  const url = "https://63e4a1368e1ed4ccf6e29538.mockapi.io/Crud";
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const setData = (id, firstName, lastName) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
  };

  const getData = () => {
    axios.get(`${url}`).then((getData) => {
      setApiData(getData.data);
    });
  };

  const onDelete = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        //this will fetch the updated data after the deletion
        getData();
      })
      .then(() => {
        navigate("/read");
      });
  };

  useEffect(() => {
    // axios.get(`${url}`).then((getData) => {
    //     setApiData(getData.data);
    //   })
    getData();
  }, []);
  return (
    <div onSumbit={handleSubmit}>
      <Input
        icon={{ name: "search", circular: true, link: true }}
        placeholder="Search..."
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {apiData
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (val.firstName.toLowerCase().includes(search)) {
                return val;
              }
            })
            .map((val) => {
              return (
                <Table.Row>
                  <Table.Cell>{val.id}</Table.Cell>
                  <Table.Cell>{val.firstName}</Table.Cell>
                  <Table.Cell>{val.lastName}</Table.Cell>
                  <Table.Cell>
                    <Link to="/update">
                      <Button
                        color="green"
                        onClick={() =>
                          setData(val.id, val.firstName, val.lastName)
                        }
                      >
                        Update
                      </Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to="/delete">
                      <Button color="red" onClick={() => onDelete(val.id)}>
                        Delete
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <div style={{ marginTop: 10 }}>
        <Button color="blue" onClick={() => navigate("/")}>
          Create
        </Button>
      </div>
    </div>
  );
}

export default Read;
