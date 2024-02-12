import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProTable from "../../components/ProTable";
import * as JsSearch from "js-search";
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
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import StoreCard from "../../components/Store/StoreCard";
import EditModal from "../../components/Modals/EditModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const StoresPage = () => {
  const itemPerPage = 20;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [value, setValue] = React.useState("");
  const [storesData, setStoresData] = React.useState([]);

  const [filterValue, setFilterValue] = React.useState("");

  const handleSelectionChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const { storeCategories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStores());
    dispatch(getAllStoreCategories());
  }, []);
  const { stores } = useSelector((state) => state.stores);

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    if (stores) {
      let filteredDatas = [...stores];

      if (hasSearchFilter) {
        var search = new JsSearch.Search("id");

        search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
        search.searchIndex = new JsSearch.UnorderedSearchIndex();
        JsSearch.StopWordsMap.bob = true;

        searchIndexes.map((element) => {
          search.addIndex(element);
        });

        search.addDocuments([...stores]);

        filteredDatas = search.search(filterValue);
      }
      setStoresData(filteredDatas);
    }
  }, [filterValue]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setCurrentPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setStoresData(stores);
  }, [stores]);

  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-primary'>
          {"Do'konlar jadvali"}
        </span>
        {storesData && storeCategories && (
          <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-row items-center w-full justify-between'>
              <div className='flex flex-row items-center gap-5'>
                <Input
                  radius='lg'
                  variant='bordered'
                  size='sm'
                  isClearable
                  className='w-[400px] text-black font-semibold'
                  placeholder='Qidirish...'
                  startContent={<MagnifyingGlassIcon className='w-[18px]' />}
                  value={filterValue}
                  onClear={() => onClear()}
                  onValueChange={onSearchChange}
                />
                <Select
                  radius='lg'
                  size='sm'
                  label='Kategoriya'
                  variant='bordered'
                  color='primary'
                  placeholder='Kategoriya tanlash'
                  selectedKeys={[value]}
                  className='w-[300px] text-black text-[16px]'
                  onChange={handleSelectionChange}
                >
                  {storeCategories.map((ctg) => (
                    <SelectItem
                      key={ctg?.id}
                      value={ctg?.id}
                      className='text-black'
                    >
                      {ctg?.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
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
            {storesData.length > 0 ? (
              <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-5 flex-wrap justify-around'>
                {storesData
                  .filter((el) => {
                    if (value === "") {
                      return true;
                    } else {
                      return el?.categoryStore?.id === +value;
                    }
                  })
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
            ) : (
              <div className='flex w-full justify-center items-center'>
                <span>{"Ma'lumot topilmadi."}</span>
              </div>
            )}
            <Pagination
              total={Math.ceil(
                storesData.filter((el) => {
                  if (value === "") {
                    return true;
                  } else {
                    return el?.categoryStore?.id === +value;
                  }
                }).length / itemPerPage
              )}
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
