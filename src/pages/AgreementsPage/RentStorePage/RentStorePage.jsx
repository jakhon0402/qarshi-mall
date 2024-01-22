import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import date from "date-and-time";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import ProTable from "../../../components/ProTable";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Chip, Divider } from "@nextui-org/react";
import { getMoneyPattern } from "../../../utils/regex";
import {
  getRentStoreById,
  getRentStorePaymentsById,
  createPayment,
  deletePayment,
  updatePayment,
} from "../rentStoreSlice";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  emptyValues,
  fields,
  searchIndexes,
  validationSchema,
} from "./data";

const RentStorePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { rentStore, rentPayments } = useSelector((state) => state.rentStores);

  useEffect(() => {
    dispatch(getRentStoreById(id));
    dispatch(getRentStorePaymentsById(id));
  }, []);

  return (
    <div className='flex flex-col w-full p-5 gap-5'>
      <div className='grid grid-cols-2 gap-8 w-full'>
        <div className='flex flex-col w-full p-5 bg-white rounded-xl h-fit'>
          <div className='flex flex-row justify-between'>
            <span className='text-[16px] text-black font-semibold'>
              {"Do'kon ma'lumotlari"}
            </span>
            <Chip variant='flat' color='warning' className='font-bold'>
              {"ARENDA"}
            </Chip>
          </div>
          <div className='flex flex-row justify-between mt-5'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"F.I.Sh"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {rentStore?.store?.fullName}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Do'kon raqami"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {rentStore?.store?.storeNumber}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Shartnoma raqami"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {rentStore?.store?.contractNumber}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Do'kon o'lchami"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {`${rentStore?.store?.size} m²`}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 w-full gap-3'>
          <div className='flex flex-col col-span-2 gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
            <CurrencyDollarIcon className='w-[28px] text-primary mb-1' />
            <span className='text-[14px] text-neutral-500 font-semibold'>
              {"Arenda to'lov qiymati"}
            </span>
            <span className='text-[16px] text-black font-bold mb-1'>
              {`${getMoneyPattern(rentStore?.rentingAmount, ",")} UZS`}
            </span>
          </div>

          {/* <div className='flex flex-col gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
            <BanknotesIcon className='w-[28px] text-orange-500 mb-1' />
            <span className='text-[14px] text-neutral-500 font-semibold'>
              {"Boshlang'ich to'lov"}
            </span>
            <span className='text-[16px] text-black font-bold mb-1'>
              {`${getMoneyPattern(rentStore?.initialPayment, ",")} UZS`}
            </span>
          </div> */}
          <div className='flex flex-col gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
            <BanknotesIcon className='w-[28px] text-green-500 mb-1' />
            <span className='text-[14px] text-neutral-500 font-semibold'>
              {"To'langan summa"}
            </span>
            <span className='text-[16px] text-black font-bold mb-1'>
              {`${getMoneyPattern(
                rentPayments?.reduce((acc, entry) => acc + entry.paidAmount, 0),
                ","
              )} UZS`}
            </span>
          </div>
          <div className='flex flex-col gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
            <BanknotesIcon className='w-[28px] text-pink-500 mb-1' />
            <span className='text-[14px] text-neutral-500 font-semibold'>
              {"Qarzdorlik"}
            </span>
            <span className='text-[16px] text-black font-bold mb-1'>
              {`${getMoneyPattern(
                rentPayments?.reduce(
                  (acc, entry) =>
                    acc + (entry.paymentAmount - entry.paidAmount),
                  0
                ),
                ","
              )} UZS`}
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full bg-white p-5 rounded-2xl'>
        {rentPayments && (
          <ProTable
            searchIndexes={searchIndexes}
            isSearch={false}
            tableName="Oylik to'lov"
            //   viewButtonUrl='/stores'
            createSubmitHandler={(reqBody) =>
              dispatch(
                createPayment({
                  data: {
                    fromDate: new Date(reqBody?.fromDate),
                    toDate: new Date(reqBody?.toDate),
                    rentStoreId: +id,
                    status: "PROCESS",
                    ...reqBody,
                  },
                })
              )
            }
            editSubmitHandler={(reqBody) =>
              dispatch(
                updatePayment({
                  id: reqBody?.id,
                  data: {
                    fromDate: new Date(reqBody?.fromDate),
                    toDate: new Date(reqBody?.toDate),
                    rentStoreId: +id,
                    status: "PROCESS",
                    ...reqBody,
                  },
                })
              )
            }
            deleteSubmitHandler={(id) =>
              dispatch(deletePayment({ paymentId: id }))
            }
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            tableData={rentPayments}
            createData={{
              fields: fields,
              initialValues: emptyValues,
              validationSchema: validationSchema,
            }}
            editData={{
              fields,
              initialValues: (data) => ({
                ...data,
                fromDate: date.format(new Date(data?.fromDate), "YYYY-MM-DD"),
                toDate: date.format(new Date(data?.toDate), "YYYY-MM-DD"),
              }),
              validationSchema,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RentStorePage;
