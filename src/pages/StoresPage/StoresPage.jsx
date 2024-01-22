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
  searchIndexes,
  validationSchema,
} from "./data";
import { getAllStoreCategories } from "../Categories/categoriesSlice";
import CreateModal from "../../components/Modals/CreateModal";
import { Button, Pagination } from "@nextui-org/react";
import StoreCard from "../../components/Store/StoreCard";
import EditModal from "../../components/Modals/EditModal";
import DeleteModal from "../../components/Modals/DeleteModal";

const StoresPage = () => {
  const itemPerPage = 20;
  const [currentPage, setCurrentPage] = React.useState(1);
  const { storeCategories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStores());
    dispatch(getAllStoreCategories());
  }, []);
  const { stores } = useSelector((state) => state.stores);
  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-primary'>
          {"Do'konlar jadvali"}
        </span>
        {stores && storeCategories && (
          <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-row w-full justify-between'>
              <span></span>
              <CreateModal
                // ctgs={categories}
                handleSubmit={(reqBody) => {
                  dispatch(createStore(reqBody));
                }}
                btnText={`Do'kon qo'shish`}
                fields={fields.map((el) => {
                  if (el.name === "categoryStoreId") {
                    el.selectData = storeCategories;
                    return el;
                  }

                  return el;
                })}
                validationSchema={validationSchema}
                initialValues={emptyValues}
              />
            </div>
            <div className='flex flex-row w-full gap-5'>
              {stores
                .slice(
                  (currentPage - 1) * itemPerPage,
                  (currentPage - 1) * itemPerPage + itemPerPage
                )
                .map((store, index) => (
                  <StoreCard
                    key={index}
                    store={store}
                    deleteModal={(str) => (
                      <DeleteModal
                        button={<Button color='danger'>{"O'chirish"}</Button>}
                        contextText={str?.storeNumber + " do'kon"}
                        handleSubmit={() =>
                          dispatch(deleteStore({ id: str?.id }))
                        }
                      />
                    )}
                    editModal={(str) => (
                      <EditModal
                        button={
                          <Button
                            color='warning'
                            variant='shadow'
                            className='w-fit text-white'
                          >
                            {"Tahrirlash"}
                          </Button>
                        }
                        // ctgs={categories}
                        handlerSubmit={(reqBody) =>
                          dispatch(updateStore(reqBody))
                        }
                        fields={fields.map((el) => {
                          if (el.name === "categoryStoreId") {
                            el.selectData = storeCategories;
                            return el;
                          }

                          return el;
                        })}
                        validationSchema={validationSchema}
                        initialValues={{
                          id: str?.id,
                          contractNumber: str?.contractNumber,
                          storeNumber: str?.storeNumber,
                          size: str?.size,
                          fullName: str?.fullName,

                          categoryStoreId: str?.categoryStore?.id + "",
                        }}
                      />
                    )}
                  />
                ))}
            </div>
            <Pagination
              total={Math.ceil(stores.length / itemPerPage)}
              className='mt-5'
              color='primary'
              page={currentPage}
              onChange={setCurrentPage}
            />
            {/* <ProTable
              searchIndexes={searchIndexes}
              tableName="Do'kon"
              // viewButtonUrl='/stores'
              createSubmitHandler={(reqBody) => {
                dispatch(createStore(reqBody));
              }}
              editSubmitHandler={(reqBody) => dispatch(updateStore(reqBody))}
              deleteSubmitHandler={(id) => dispatch(deleteStore({ id }))}
              columns={columns}
              initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
              tableData={stores}
              createData={{
                fields: fields.map((el) => {
                  if (el.name === "categoryStoreId") {
                    el.selectData = storeCategories;
                    return el;
                  }

                  return el;
                }),
                initialValues: emptyValues,
                validationSchema,
              }}
              editData={{
                fields: fields.map((el) => {
                  if (el.name === "categoryStoreId") {
                    el.selectData = storeCategories;
                    return el;
                  }

                  return el;
                }),
                initialValues: (user) => {
                  return {
                    categoryStoreId: user?.categoryStore?.id + "",
                    ...user,
                  };
                },
                validationSchema,
              }}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresPage;
