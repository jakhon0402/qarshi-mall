import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";
import ProTable from "../../components/ProTable";
import { useDispatch, useSelector } from "react-redux";
import {
  createIncome,
  deleteIncome,
  getAllIncomes,
  getAllIncomesByDateRange,
  getIncomeTotalPrice,
  updateIncome,
} from "./incomesSlice";
import { getAllCategories } from "../Categories/categoriesSlice";
import {
  fields,
  emptyValues,
  validationSchema,
  columns,
  INITIAL_VISIBLE_COLUMNS,
} from "./data";
import { formatDate, getMoneyPattern } from "../../utils/regex";
import { DateRangePicker } from "rsuite";
import { getOutcomeTotalPrice } from "../OutcomesPage/outcomesSlice";

const IncomesPage = () => {
  const dispatch = useDispatch();
  const { incomes, totalPrice } = useSelector((state) => state.incomes);

  useEffect(() => {
    dispatch(getIncomeTotalPrice());
    dispatch(getAllIncomes());
    dispatch(getAllCategories());
  }, []);

  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-row w-full gap-8 items-center'>
        <span className='flex flex-col w-full items-center bg-green-200/50 text-green-600 rounded-xl py-3'>
          Kirim{" "}
          <span className='font-bold'>{`${
            totalPrice == 0 ? 0 : totalPrice ? getMoneyPattern(totalPrice) : ""
          } so'm`}</span>
        </span>

        <div className='flex-none relative'>
          <DateRangePicker
            placement='bottomEnd'
            onChange={(date) => {
              if (date) {
                dispatch(
                  getAllIncomesByDateRange({
                    startDate: date[0].toISOString(),
                    endDate: date[1].toISOString(),
                  })
                );
              } else {
                dispatch(getAllIncomes());
              }
            }}
          />
          {/* <Tabs color='primary'>
            <Tab key='monthly' title='Oylik' />
            <Tab key='weekly' title='Haftalik' />
            <Tab key='daily' title='Kunlik' />
          </Tabs> */}
        </div>
      </div>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-green-600'>
          Kirimlar jadvali
        </span>
        {incomes && (
          <ProTable
            isFilterCtg={true}
            createSubmitHandler={(reqBody) =>
              dispatch(createIncome(reqBody)).then(() =>
                dispatch(getIncomeTotalPrice())
              )
            }
            editSubmitHandler={(reqBody) => {
              dispatch(updateIncome(reqBody)).then(() =>
                dispatch(getIncomeTotalPrice())
              );
            }}
            deleteSubmitHandler={(id) =>
              dispatch(deleteIncome({ id })).then(() =>
                dispatch(getIncomeTotalPrice())
              )
            }
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            tableData={incomes}
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

export default IncomesPage;
