import React from "react";
import ProSidebar from "../../components/Sidebar/ProSidebar";
import { Route, Routes, Navigate } from "react-router";
import CategoriesPage from "../Categories/CategoriesPage";
import IncomesPage from "../IncomesPage/IncomesPage";
import OutgoingsPage from "../OutcomesPage/OutgoingsPage";
import EmployeesPage from "../EmployeesPage/EmployeesPage";

import EmployeePage from "../EmployeesPage/EmployeePage";
import StatisticsPage from "../StatisticsPage";

const DashboardPage = () => {
  return (
    <div className='flex flex-col w-screen'>
      {/* <Navbar /> */}
      <div className='flex flex-row h-fit'>
        <ProSidebar />
        <div className='grow flex flex-col w-[500px] bg-neutral-100 overflow-y-scroll h-[calc(100vh_-_0px)]'>
          {" "}
          <Routes>
            <Route path='/incomes' element={<IncomesPage />} />
            <Route path='/outgoings' element={<OutgoingsPage />} />
            <Route path='/statistics' element={<StatisticsPage />} />
            <Route path='/categories' element={<CategoriesPage />} />
            <Route path='/employees/:id' element={<EmployeePage />} />
            <Route path='/employees' element={<EmployeesPage />} />
            {/* <Route path='/inventory' element={<InventoryPage />} /> */}
            <Route path='/*' element={<Navigate to='/incomes' />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
