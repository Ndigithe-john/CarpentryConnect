import deleteIcon from "../../assets/delete.png";
import "./showitemsStyles.css";
const ShowItems = () => {
  return (
    <div>
      <main className="table">
        <section className="table_header">
          <h1>Pending Items</h1>
        </section>
        <section className="table_body">
          <table>
            <thead>
              <tr>
                <th>ItemID</th>
                <th>Category</th>
                <th>Status</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12</td>
                <td>Sleeping</td>
                <td>pending</td>
                <td>New item</td>
                <td>
                  <strong>Ksh. 400</strong>
                </td>
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
                <td>New item</td>
                <td>
                  <strong>Ksh. 300</strong>
                </td>
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
