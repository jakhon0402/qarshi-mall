import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdsItem,
  deleteAdsItem,
  getAllAdsItems,
  updateAdsItem,
} from "./adsItemsSlice";
import {
  INITIAL_VISIBLE_COLUMNS,
  emptyValues,
  searchIndexes,
  fields,
  columns,
  validationSchema,
} from "./data";
import ProTable from "../../components/ProTable";

const AdsPage = () => {
  const dispatch = useDispatch();
  const { adsItems } = useSelector((state) => state.adsItems);

  useEffect(() => {
    dispatch(getAllAdsItems());
  }, []);

  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-green-600'>
          Reklamalar jadvali
        </span>
        {adsItems && (
          <ProTable
            searchIndexes={searchIndexes}
            viewButtonUrl='/ads'
            createSubmitHandler={(reqBody) =>
              dispatch(
                createAdsItem({
                  ...reqBody,
                })
              )
            }
            editSubmitHandler={(reqBody) => dispatch(updateAdsItem(reqBody))}
            deleteSubmitHandler={(id) => dispatch(deleteAdsItem({ id }))}
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            tableData={adsItems}
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

export default AdsPage;
