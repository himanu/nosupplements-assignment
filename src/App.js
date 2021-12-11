import "./index.css";
import { useEffect, useState } from "react";
import User from "./User";
export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      let data = await response.json();
      setUsers(data);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      {users.map((user) => {
        return (
          <User
            user={user}
            key={user.id}
            handleDelete={(userId) => {
              setUsers((oldUsers) => {
                return oldUsers.filter((user1) => user1.id !== userId);
              });
            }}
            editUser={(name, email, phone, website) => {
              setUsers((oldUsers) => {
                return oldUsers.map((user1) => {
                  if (user1.id !== user.id) {
                    return user1;
                  } else {
                    return {
                      ...user1,
                      name,
                      email,
                      phone,
                      website
                    };
                  }
                });
              });
            }}
          />
        );
      })}
    </div>
  );
}
