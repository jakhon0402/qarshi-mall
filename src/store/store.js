import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Login/authSlice";
import categoryReducer from "../pages/Categories/categoriesSlice";
import incomeReducer from "../pages/IncomesPage/incomesSlice";
import outcomeReducer from "../pages/OutcomesPage/outcomesSlice";
import employeeReducer from "../pages/EmployeesPage/employeesSlice";
// import inventoryReducer from "../pages/InventoryPage/inventorySlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    incomes: incomeReducer,
    outcomes: outcomeReducer,
    employees: employeeReducer,
    // inventory: inventoryReducer,
  },
});
