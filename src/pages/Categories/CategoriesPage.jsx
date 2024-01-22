import React, { useEffect } from "react";
import ProTable from "../../components/ProTable";
import {
  fields,
  emptyValues,
  validationSchema,
  columns,
  INITIAL_VISIBLE_COLUMNS,
} from "./data";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  createStoreCategory,
  deleteCategory,
  deleteStoreCategory,
  getAllCategories,
  getAllStoreCategories,
  updateCategory,
  updateStoreCategory,
} from "./categoriesSlice";
import { Tab, Tabs } from "@nextui-org/react";

const CategoriesPage = () => {
  const [selected, setSelected] = React.useState("category");
  const dispatch = useDispatch();
  const { categories, storeCategories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (selected === "category") {
      dispatch(getAllCategories());
    } else {
      dispatch(getAllStoreCategories());
    }
  }, [selected]);

  return (
    <div className='bg-neutral-100 p-5 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-green-600'>
          Kategoriyalar jadvali
        </span>
        <div className='flex flex-col w-full items-center gap-5'>
          <Tabs
            aria-label='Options'
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key='category' title='Kategoriyalar'></Tab>
            <Tab key='categoryStore' title="Do'kon kategoriyalari"></Tab>
          </Tabs>
          {selected === "category" && categories && (
            <ProTable
              createSubmitHandler={(reqBody) =>
                dispatch(createCategory(reqBody))
              }
              editSubmitHandler={(reqBody) => dispatch(updateCategory(reqBody))}
              deleteSubmitHandler={(id) => dispatch(deleteCategory({ id }))}
              columns={columns}
              initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
              tableData={categories}
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
          {selected === "categoryStore" && storeCategories && (
            <ProTable
              createSubmitHandler={(reqBody) =>
                dispatch(createStoreCategory(reqBody))
              }
              editSubmitHandler={(reqBody) =>
                dispatch(updateStoreCategory(reqBody))
              }
              deleteSubmitHandler={(id) =>
                dispatch(deleteStoreCategory({ id }))
              }
              columns={columns}
              initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
              tableData={storeCategories}
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
    </div>
  );
};

export default CategoriesPage;
