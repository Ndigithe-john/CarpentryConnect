import "./showitemsStyles.css";
const CapenterList = ({ userRole }) => {
  return (
    <div>
      <main className="table">
        <section className="table_header">
          {userRole === "Carpenter" ? (
            <h1>WorkshopOwners List</h1>
          ) : (
            <h1>Capenters List</h1>
          )}
        </section>
        <section className="table_body">
          <table>
            <thead>
              {userRole === "WorkshopOwner" ? (
                <>
                  <tr>
                    <th>CapenterID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>PhoneNumber</th>
                    <th>Qualification</th>
                  </tr>
                </>
              ) : (
                <>
                  <th>WorkshopOwnerID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>PhoneNumber</th>
                  <th>WorkshopName</th>
                  <th>WorkshopLocation</th>
                </>
              )}
            </thead>
            <tbody>
              <tr>
                <td>12</td>
                <td>John</td>
                <td>johnnie@gmail.com</td>
                <td>0789898989</td>
                <td>Diploma</td>
              </tr>
              <tr>
                <td>13</td>
                <td>Mike</td>
                <td>mikey@gmail.com</td>
                <td>0767676767</td>
                <td>Diploma</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};
export default CapenterList;
