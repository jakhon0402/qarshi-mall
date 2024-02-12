import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores } from "../StoresPage/storesSlice";
import {
  createSaleStore,
  deleteSaleStore,
  getAllSaleStores,
  updateSaleStore,
} from "./saleStoresSlice";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  emptyValues,
  fields,
  searchIndexes,
  validationSchema,
} from "./data/saleStore";
import ProTable from "../../components/ProTable";
import {
  createRentStore,
  deleteRentStore,
  getAllRentStores,
  updateRentStore,
} from "./rentStoreSlice";
import {
  INITIAL_VISIBLE_COLUMNS_RENT,
  columnsRent,
  emptyValuesRent,
  fieldsRent,
  searchIndexesRent,
  validationSchemaRent,
} from "./data/rentStore";

const AgreementsPage = () => {
  const [selected, setSelected] = React.useState("sale");

  const { stores } = useSelector((state) => state.stores);
  const { saleStores } = useSelector((state) => state.saleStores);
  const { rentStores } = useSelector((state) => state.rentStores);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStores());
  }, []);

  useEffect(() => {
    if (selected === "sale") {
      dispatch(getAllSaleStores());
    } else {
      dispatch(getAllRentStores());
    }
  }, [selected]);

  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-primary'>
          {"Kelishuvlar"}
        </span>
        <div className='flex flex-col w-full items-center gap-5'>
          <Tabs
            color='secondary'
            size='lg'
            aria-label='Options'
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key='sale' title='Sotuv'></Tab>
            <Tab key='rent' title='Arenda'></Tab>
          </Tabs>
          {stores && selected === "sale" && saleStores && (
            <ProTable
              tableName='Sotuv'
              searchIndexes={searchIndexes}
              viewButtonUrl='/agreements/sale'
              createSubmitHandler={(reqBody) =>
                dispatch(createSaleStore(reqBody))
              }
              editSubmitHandler={(reqBody) =>
                dispatch(updateSaleStore(reqBody))
              }
              deleteSubmitHandler={(id) => dispatch(deleteSaleStore({ id }))}
              columns={columns}
              initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
              tableData={saleStores}
              createData={{
                fields: fields.map((el) => {
                  if (el.name === "storeId") {
                    el.selectData = stores.map((el) => ({
                      name: el?.storeNumber,
                      ...el,
                    }));
                    return el;
                  }

                  return el;
                }),
                initialValues: emptyValues,
                validationSchema,
              }}
              editData={{
                fields,
                initialValues: (data) => ({
                  storeId: data?.store?.id + "",
                  ...data,
                }),
                validationSchema,
              }}
            />
          )}
          {stores && selected === "rent" && rentStores && (
            <ProTable
              tableName='Arenda'
              searchIndexes={searchIndexesRent}
              viewButtonUrl='/agreements/rent'
              createSubmitHandler={(reqBody) =>
                dispatch(createRentStore(reqBody))
              }
              editSubmitHandler={(reqBody) =>
                dispatch(updateRentStore(reqBody))
              }
              deleteSubmitHandler={(id) => dispatch(deleteRentStore({ id }))}
              columns={columnsRent}
              initialVisibleColumns={INITIAL_VISIBLE_COLUMNS_RENT}
              tableData={rentStores}
              createData={{
                fields: fieldsRent.map((el) => {
                  if (el.name === "storeId") {
                    el.selectData = stores.map((el) => ({
                      name: el?.storeNumber,
                      ...el,
                    }));
                    return el;
                  }

                  return el;
                }),
                initialValues: emptyValuesRent,
                validationSchema: validationSchemaRent,
              }}
              editData={{
                fields: fieldsRent,
                initialValues: (data) => data,
                validationSchema: validationSchemaRent,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgreementsPage;
