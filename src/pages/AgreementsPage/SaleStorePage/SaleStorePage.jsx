import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createPayment,
  deletePayment,
  getSaleStoreById,
  getSaleStorePaymentsById,
  updatePayment,
} from "../saleStoresSlice";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  emptyValues,
  fields,
  searchIndexes,
  validationSchema,
} from "./data";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import ProTable from "../../../components/ProTable";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Chip, Divider } from "@nextui-org/react";
import { getMoneyPattern } from "../../../utils/regex";

const SaleStorePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { saleStore, storePayments } = useSelector((state) => state.saleStores);

  useEffect(() => {
    dispatch(getSaleStoreById(id));
    dispatch(getSaleStorePaymentsById(id));
  }, []);

  return (
    <div className='flex flex-col w-full p-5 gap-5'>
      <div className='grid grid-cols-2 gap-8 w-full'>
        <div className='flex flex-col w-full p-5 bg-white rounded-xl h-fit'>
          <div className='flex flex-row justify-between'>
            <span className='text-[16px] text-black font-semibold'>
              {"Do'kon ma'lumotlari"}
            </span>
            <Chip variant='flat' color='secondary' className='font-bold'>
              {"SOTUV"}
            </Chip>
          </div>
          <div className='flex flex-row justify-between mt-5'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"F.I.Sh"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {saleStore?.store?.fullName}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Do'kon raqami"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {saleStore?.store?.storeNumber}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Shartnoma raqami"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {saleStore?.store?.contractNumber}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Do'kon o'lchami"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {`${saleStore?.store?.size} m²`}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 w-full gap-3'>
          <div className='flex flex-col gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
            <CurrencyDollarIcon className='w-[28px] text-primary mb-1' />
            <span className='text-[14px] text-neutral-500 font-semibold'>
              {"To'lov qiymati"}
            </span>
            <span className='text-[16px] text-black font-bold mb-1'>
              {`${getMoneyPattern(saleStore?.fullAmount, ",")} UZS`}
            </span>
          </div>

          <div className='flex flex-col gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
            <BanknotesIcon className='w-[28px] text-orange-500 mb-1' />
            <span className='text-[14px] text-neutral-500 font-semibold'>
              {"Boshlang'ich to'lov"}
            </span>
            <span className='text-[16px] text-black font-bold mb-1'>
              {`${getMoneyPattern(saleStore?.initialPayment, ",")} UZS`}
            </span>
          </div>
          <div className='flex flex-col gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
            <BanknotesIcon className='w-[28px] text-green-500 mb-1' />
            <span className='text-[14px] text-neutral-500 font-semibold'>
              {"To'langan summa"}
            </span>
            <span className='text-[16px] text-black font-bold mb-1'>
              {`${getMoneyPattern(
                storePayments?.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue?.newPayment;
                }, 0),
                ","
              )} UZS`}
            </span>
          </div>
          <div className='flex flex-col gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
            <BanknotesIcon className='w-[28px] text-pink-500 mb-1' />
            <span className='text-[14px] text-neutral-500 font-semibold'>
              {"Qoldiq summa"}
            </span>
            <span className='text-[16px] text-black font-bold mb-1'>
              {`${getMoneyPattern(
                saleStore?.fullAmount -
                  saleStore?.initialPayment -
                  storePayments?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.newPayment;
                  }, 0),
                ","
              )} UZS`}
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full bg-white p-5 rounded-2xl'>
        {storePayments && (
          <ProTable
            searchIndexes={searchIndexes}
            isSearch={false}
            tableName="To'lov"
            //   viewButtonUrl='/stores'
            createSubmitHandler={(reqBody) =>
              dispatch(createPayment({ data: reqBody, id }))
            }
            editSubmitHandler={(reqBody) =>
              dispatch(
                updatePayment({
                  storeId: id,
                  paymentId: reqBody?.id,
                  data: reqBody,
                })
              )
            }
            deleteSubmitHandler={(id) =>
              dispatch(deletePayment({ paymentId: id }))
            }
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            tableData={storePayments}
            createData={{
              fields: fields,
              initialValues: emptyValues,
              validationSchema: validationSchema,
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

export default SaleStorePage;
