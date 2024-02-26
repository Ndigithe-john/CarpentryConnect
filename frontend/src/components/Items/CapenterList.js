import { useEffect, useState } from "react";
import "./showitemsStyles.css";
import axios from "axios";

const CapenterList = ({ userRole }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        let apiURL = "http://localhost:4050/users/getWorkshopOwners";
        if (userRole === "WorkshopOwner") {
          apiURL = "http://localhost:4050/users/getCarpenters";
        }
        const response = await axios(apiURL);
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }
    getUsers();
  }, [userRole]);

  return (
    <div>
      <main className="table">
        <section className="table_header">
          {userRole === "Carpenter" ? (
            <h1>WorkshopOwners List</h1>
          ) : (
            <h1>Carpenters List</h1>
          )}
        </section>
        <section className="table_body">
          <table>
            <thead>
              <tr>
                <th>CapenterID</th>
                <th>Name</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                {userRole === "WorkshopOwner" && <th>Qualification</th>}
                {userRole === "Carpenter" && (
                  <>
                    <th>WorkshopName</th>
                    <th>WorkshopLocation</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.UserID}>
                  <td>{user.UserID}</td>
                  <td>{user.FullName}</td>
                  <td>{user.Email}</td>
                  <td>{user.PhoneNumber}</td>
                  {userRole === "WorkshopOwner" && (
                    <td>{user.QualificationLevel}</td>
                  )}
                  {userRole === "Carpenter" && (
                    <>
                      <td>{user.WorkshopName}</td>
                      <td>{user.WorkshopLocation}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default CapenterList;
