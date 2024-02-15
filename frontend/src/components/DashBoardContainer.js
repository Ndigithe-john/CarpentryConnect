const DashBoardContainer = ({ children, className = "" }) => {
  return (
    <div className={className}>
      {children}
      <hr />
    </div>
  );
};

export default DashBoardContainer;
