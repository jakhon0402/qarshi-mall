import React from "react";
import ProSidebar from "../../components/Sidebar/ProSidebar";
import { Route, Routes, Navigate } from "react-router";
import CategoriesPage from "../Categories/CategoriesPage";
import IncomesPage from "../IncomesPage/IncomesPage";
import OutgoingsPage from "../OutcomesPage/OutgoingsPage";
import EmployeesPage from "../EmployeesPage/EmployeesPage";

import EmployeePage from "../EmployeesPage/EmployeePage";
import StatisticsPage from "../StatisticsPage";
import StoresPage from "../StoresPage/StoresPage";
import StorePage from "../StoresPage/StorePage/StorePage";
import AgreementsPage from "../AgreementsPage/AgreementsPage";
import RentStorePage from "../AgreementsPage/RentStorePage/RentStorePage";
import SaleStorePage from "../AgreementsPage/SaleStorePage/SaleStorePage";
import AdsPage from "../AdsPage/AdsPage";
import AdsItemPage from "../AdsPage/AdsItemPage/AdsItemPage";

const DashboardPage = () => {
  return (
    <div className='flex flex-col w-screen'>
      {/* <Navbar /> */}
      <div className='flex flex-row h-fit'>
        <ProSidebar />
        <div className='grow flex flex-col w-[500px] bg-neutral-100 overflow-y-scroll h-[calc(100vh_-_0px)]'>
          {" "}
          <Routes>
            <Route path='/ads' element={<AdsPage />} />
            <Route path='/ads/:id' element={<AdsItemPage />} />
            <Route path='/incomes' element={<IncomesPage />} />
            <Route path='/outgoings' element={<OutgoingsPage />} />
            <Route path='/statistics' element={<StatisticsPage />} />
            <Route path='/categories' element={<CategoriesPage />} />
            <Route path='/employees/:id' element={<EmployeePage />} />
            <Route path='/employees' element={<EmployeesPage />} />
            <Route path='/stores' element={<StoresPage />} />
            <Route path='/stores/:id' element={<StorePage />} />
            <Route path='/agreements' element={<AgreementsPage />} />
            <Route path='/agreements/rent/:id' element={<RentStorePage />} />
            <Route path='/agreements/sale/:id' element={<SaleStorePage />} />
            <Route path='/*' element={<Navigate to='/incomes' />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
