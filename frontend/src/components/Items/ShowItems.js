import deleteIcon from "../../assets/delete.png";
import "./showitemsStyles.css";

const ShowItems = ({ userRole }) => {
  const isWorkshopOwner = userRole === "WorkshopOwner";

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
              <tr>
                <td>12</td>
                <td>Sleeping</td>
                <td>pending</td>
                {isWorkshopOwner && <td>New item</td>}
                {isWorkshopOwner && (
                  <td>
                    <strong>Ksh. 400</strong>
                  </td>
                )}
                <td>
                  <img
                    src={deleteIcon}
                    alt="deleteIcon"
                    style={{ width: "3em", height: "4vh" }}
                  />
                </td>
              </tr>
              <tr>
                <td>12</td>
                <td>Sleeping</td>
                <td>pending</td>
                {isWorkshopOwner && <td>New item</td>}
                {isWorkshopOwner && (
                  <td>
                    <strong>Ksh. 300</strong>
                  </td>
                )}
                <td>
                  <img
                    src={deleteIcon}
                    alt="deleteIcon"
                    style={{ width: "3em", height: "4vh" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ShowItems;
