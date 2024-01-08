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
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "./categoriesSlice";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <div className='bg-neutral-100 p-5 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-green-600'>
          Kategoriyalar jadvali
        </span>
        {categories && (
          <ProTable
            createSubmitHandler={(reqBody) => dispatch(createCategory(reqBody))}
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
            editData={{ fields, initialValues: emptyValues, validationSchema }}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
