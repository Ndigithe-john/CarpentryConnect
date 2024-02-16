import { Link } from "react-router-dom";
const AccountAboutModal = () => {
  return (
    <div className="account-modal">
      <div className="account-modal-content">
        <h4>
          <Link to="/account">Account</Link>
        </h4>
        <h4>
          <Link to="/home/dashboard">Dashboard</Link>
        </h4>
        <h4>
          <Link to="/">logout</Link>
        </h4>
      </div>
    </div>
  );
};

export default AccountAboutModal;
