import { Tab, Tabs } from "@nextui-org/react";
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
  createOutcome,
  deleteOutcome,
  getAllOutcomes,
  getAllOutcomesByDateRange,
  getOutcomeTotalPrice,
  updateOutcome,
} from "./outcomesSlice";
import { getAllCategories } from "../Categories/categoriesSlice";
import { getMoneyPattern } from "../../utils/regex";
import { DateRangePicker } from "rsuite";

const OutgoingsPage = () => {
  const dispatch = useDispatch();
  const { outcomes, totalPrice } = useSelector((state) => state.outcomes);

  useEffect(() => {
    dispatch(getOutcomeTotalPrice());
    dispatch(getAllOutcomes());
    dispatch(getAllCategories());
  }, []);

  return (
    <div className='flex flex-col w-full h-full p-8 gap-8 bg-neutral-50'>
      <div className='flex flex-row w-full gap-8 items-center'>
        <span className='flex flex-col w-full items-center bg-red-200/50 text-red-600 rounded-xl py-3'>
          Chiqim{" "}
          <span className='font-bold'>{`${
            totalPrice == 0 ? 0 : totalPrice ? getMoneyPattern(totalPrice) : ""
          } so'm`}</span>
        </span>

        <div className='flex-none'>
          <DateRangePicker
            placement='bottomEnd'
            onChange={(date) => {
              if (date) {
                dispatch(
                  getAllOutcomesByDateRange({
                    startDate: date[0].toISOString(),
                    endDate: date[1].toISOString(),
                  })
                );
              } else {
                dispatch(getAllOutcomes());
              }
            }}
          />
        </div>
      </div>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-red-600'>
          Chiqimlar jadvali
        </span>
        {outcomes && (
          <ProTable
            isFilterCtg={true}
            createSubmitHandler={(reqBody) =>
              dispatch(createOutcome(reqBody)).then(() =>
                dispatch(getOutcomeTotalPrice())
              )
            }
            editSubmitHandler={(reqBody) =>
              dispatch(updateOutcome(reqBody)).then(() =>
                dispatch(getOutcomeTotalPrice())
              )
            }
            deleteSubmitHandler={(id) =>
              dispatch(deleteOutcome({ id })).then(() =>
                dispatch(getOutcomeTotalPrice())
              )
            }
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            columns={columns}
            tableData={outcomes}
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

export default OutgoingsPage;
