import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProTable from "../../components/ProTable";
import {
  createStore,
  deleteStore,
  getAllStores,
  updateStore,
} from "./storesSlice";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  emptyValues,
  fields,
  validationSchema,
} from "./data";

const StoresPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStores());
  }, []);
  const { stores } = useSelector((state) => state.stores);
  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-primary'>
          {"Do'konlar jadvali"}
        </span>
        {stores && (
          <ProTable
            tableName="Do'kon"
            viewButtonUrl='/stores'
            createSubmitHandler={(reqBody) => dispatch(createStore(reqBody))}
            editSubmitHandler={(reqBody) => dispatch(updateStore(reqBody))}
            deleteSubmitHandler={(id) => dispatch(deleteStore({ id }))}
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            tableData={stores}
            createData={{
              fields,
              initialValues: emptyValues,
              validationSchema,
            }}
            editData={{ fields, initialValues: emptyValues, validationSchema }}
          />
        )}
      </div>
    </div>
  );
};

export default StoresPage;
