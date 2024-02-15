const DashBoardContainer = ({ children }) => {
  return (
    <div className="dashboard_div_container">
      {children}
      <hr />
    </div>
  );
};

export default DashBoardContainer;
