import "./showitemsStyles.css";
const CapenterList = () => {
  return (
    <div>
      <main className="table">
        <section className="table_header">
          <h1>CapentersList</h1>
        </section>
        <section className="table_body">
          <table>
            <thead>
              <tr>
                <th>CapenterID</th>
                <th>Name</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Qualification</th>
                <th>Reviews</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12</td>
                <td>John</td>
                <td>johnnie@gmail.com</td>
                <td>0789898989</td>
                <td>Diploma</td>
                <td>Star</td>
              </tr>
              <tr>
                <td>13</td>
                <td>Mike</td>
                <td>mikey@gmail.com</td>
                <td>0767676767</td>
                <td>Diploma</td>
                <td>Star</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};
export default CapenterList;
