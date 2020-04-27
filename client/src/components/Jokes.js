import React, { useEffect, useState } from "react";
import { Button, Table, Spinner } from "reactstrap";
import axios, { logout } from "../utils/axios";

function UserList(props) {
  const [jokes, setJokes] = useState([]);
  const { history } = props;

  useEffect(() => {
    axios()
      .get("/api/jokes")
      .then(({ data }) => setJokes(data))
      .catch((err) => {
        console.dir(err);
        history.push("/");
      });
  }, []);

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  if (!jokes.length) return <Spinner color="primary" />;

  return (
    <div className="joke-list">
      <header>
        <h2>Jokes</h2>
      </header>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>joke</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((j) => (
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.joke}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default UserList;
