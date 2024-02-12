import React, { useEffect } from "react";
import ProTable from "../../components/ProTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fields,
  emptyValues,
  validationSchema,
  columns,
  INITIAL_VISIBLE_COLUMNS,
  searchIndexes,
} from "./data";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "./employeesSlice";

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-green-600'>
          Xodimlar jadvali
        </span>
        {employees && (
          <ProTable
            searchIndexes={searchIndexes}
            viewButtonUrl='/employees'
            createSubmitHandler={(reqBody) =>
              dispatch(
                createEmployee({
                  currentSalary: +reqBody?.currentSalary,
                  ...reqBody,
                })
              )
            }
            editSubmitHandler={(reqBody) => dispatch(updateEmployee(reqBody))}
            deleteSubmitHandler={(id) => dispatch(deleteEmployee({ id }))}
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            tableData={employees}
            createData={{
              fields,
              initialValues: emptyValues,
              validationSchema,
            }}
            editData={{
              fields,
              initialValues: (data) => data,
              validationSchema,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
