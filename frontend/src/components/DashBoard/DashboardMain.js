import DashBoardContainer from "./DashBoardContainer";
const DashboardMain = () => {
  return (
    <div className="dashboard_main_container">
      <div className="top_dashboard_main_container">
        <h1>Dashboard</h1>
        <DashBoardContainer className="dashboard_amount_container">
          Total Amount
        </DashBoardContainer>
      </div>
      <div className="down_dashboard_main_container">
        <DashBoardContainer className="dashboard_div_container dashbaord_main_one">
          Items
        </DashBoardContainer>
        <DashBoardContainer className="dashboard_div_container dashbaord_main_two">
          Orders
        </DashBoardContainer>
        <DashBoardContainer className="dashboard_div_container dashbaord_main_three">
          Carpenters
        </DashBoardContainer>
        <DashBoardContainer className="dashboard_div_container dashbaord_main_four">
          Reviews
        </DashBoardContainer>
      </div>
    </div>
  );
};

export default DashboardMain;
