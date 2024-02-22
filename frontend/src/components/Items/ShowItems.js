import React, { useState, useEffect } from "react";
import deleteIcon from "../../assets/delete.png";
import "./showitemsStyles.css";
import axios from "axios";

const ShowItems = ({ userRole }) => {
  const isWorkshopOwner = userRole === "WorkshopOwner";
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/users/userItems",
          { withCredentials: true }
        );
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <main className="table">
        <section className="table_header">
          <h1>Items</h1>
        </section>
        <section className="table_body">
          <table>
            <thead>
              <tr>
                <th>ItemID</th>
                <th>Category</th>
                <th>Description</th>
                {isWorkshopOwner && <th>Status</th>}
                {isWorkshopOwner && <th>Amount</th>}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.ItemID}>
                  <td>{item.ItemID}</td>
                  <td>{item.Category}</td>
                  <td>{item.Description}</td>
                  {isWorkshopOwner && <td>{item.Status}</td>}
                  {isWorkshopOwner && (
                    <td>
                      <strong>{`Ksh. ${item.price}`}</strong>
                    </td>
                  )}
                  <td>
                    <img
                      src={deleteIcon}
                      alt="deleteIcon"
                      style={{ width: "3em", height: "4vh", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ShowItems;
