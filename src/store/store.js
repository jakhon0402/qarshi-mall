import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Login/authSlice";
import categoryReducer from "../pages/Categories/categoriesSlice";
import incomeReducer from "../pages/IncomesPage/incomesSlice";
import outcomeReducer from "../pages/OutcomesPage/outcomesSlice";
import employeeReducer from "../pages/EmployeesPage/employeesSlice";
import saleStoreReducer from "../pages/AgreementsPage/saleStoresSlice";
import rentStoreReducer from "../pages/AgreementsPage/rentStoreSlice";
import storeReducer from "../pages/StoresPage/storesSlice";
import adsItemReducer from "../pages/AdsPage/adsItemsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    incomes: incomeReducer,
    outcomes: outcomeReducer,
    employees: employeeReducer,
    saleStores: saleStoreReducer,
    rentStores: rentStoreReducer,
    stores: storeReducer,
    adsItems: adsItemReducer,
    // inventory: inventoryReducer,
  },
});
