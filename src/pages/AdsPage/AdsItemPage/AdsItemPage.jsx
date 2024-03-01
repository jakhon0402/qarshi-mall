import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createPayment,
  deletePayment,
  getAdsItemById,
  getAdsItemPaymentsById,
  updatePayment,
  uploadImage,
} from "../adsItemsSlice";
import date from "date-and-time";

import { useDispatch, useSelector } from "react-redux";
import { Button, Chip, Divider } from "@nextui-org/react";
import { BanknotesIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { getMoneyPattern } from "../../../utils/regex";
import { getStoreImage } from "../../../utils/utils";
import ProTable from "../../../components/ProTable";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  emptyValues,
  fields,
  searchIndexes,
  validationSchema,
} from "./payments";

const AdsItemPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setIsImageSelected(true);
    }
  };

  const { adsItem, adsPayments, uploadLoading } = useSelector(
    (state) => state.adsItems
  );

  useEffect(() => {
    dispatch(getAdsItemById({ id }));
    dispatch(getAdsItemPaymentsById({ id }));
  }, []);

  return (
    <div className='flex flex-col items-center p-5 gap-5'>
      <div className='grid grid-cols-7 gap-8 w-full'>
        <div className='flex flex-col col-span-3 w-full p-5 bg-white rounded-xl h-fit'>
          <div className='flex flex-row justify-between'>
            <span className='text-[16px] text-black font-semibold'>
              {"Reklama ma'lumotlari"}
            </span>
            {/* <Chip variant='flat' color='warning' className='font-bold'>
              {"ARENDA"}
            </Chip> */}
          </div>
          <div className='flex flex-row justify-between mt-5'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Description"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {adsItem?.description}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Size"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {adsItem?.size}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-neutral-600 font-semibold'>
              {"Location"}
            </span>
            <span className='text-[14px] text-black font-semibold'>
              {adsItem?.location}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 col-span-2 w-full gap-3'>
          {/* <div className='flex flex-col col-span-2 gap-1 w-full bg-white rounded-2xl p-5 h-fit'>
              <CurrencyDollarIcon className='w-[28px] text-primary mb-1' />
              <span className='text-[14px] text-neutral-500 font-semibold'>
                {"Arenda to'lov qiymati"}
              </span>
              <span className='text-[16px] text-black font-bold mb-1'>
                {`${getMoneyPattern(rentStore?.rentingAmount, ",")} UZS`}
              </span>
            </div> */}

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
                adsPayments?.reduce((acc, entry) => acc + entry.paidAmount, 0),
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
                adsPayments?.reduce(
                  (acc, entry) =>
                    acc + (entry.paymentAmount - entry.paidAmount),
                  0
                ),
                ","
              )} UZS`}
            </span>
          </div>
        </div>
        <div className='flex flex-col col-span-2 gap-2 items-center w-full'>
          {/* {label && (
                    <span className='text-[16px] font-semibold font-space mb-[-30px]'>
                      {label}
                    </span>
                  )} */}
          <input
            onChange={handleFileChange}
            type='file'
            name='avatar'
            id={adsItem?.id}
            className={"w-[300px] invisible h-0 overflow-hidden"}
            accept='image/*'
          />
          <label
            htmlFor={adsItem?.id}
            // onMouseEnter={() => setIsImgHover(true)}
            // onMouseLeave={() => setIsImgHover(false)}
            className='group w-fit'
          >
            <div
              className={
                "w-[300px] h-[250px] relative rounded-[30px] overflow-hidden"
              }
            >
              <img
                src={
                  image === null
                    ? getStoreImage(adsItem?.fileEntity)
                    : URL.createObjectURL(image)
                }
                className='w-full h-full object-cover bg-contain bg-no-repeat'
              />

              <div
                className={
                  // isImgHover
                  // ? "flex justify-center items-end pb-5 w-full h-full absolute rounded-[30px] top-0 left-0 bg-forestydark-400/30"
                  "flex justify-center items-end pb-5 w-full h-full invisible group-hover:visible absolute rounded-[30px] top-0 left-0 bg-forestydark-400/30"
                }
              >
                <span className='text-foresty-white'>Rasm tanlash</span>
              </div>
            </div>
          </label>
          <div className={"flex flex-row items-center gap-2 w-full"}>
            <Button
              className='flex flex-grow'
              isLoading={uploadLoading}
              color={!isImageSelected ? "default" : "primary"}
              onClick={() =>
                dispatch(
                  uploadImage({
                    file: image,
                    adsItemData: {
                      id: adsItem?.id,
                      description: adsItem?.description,
                      location: adsItem?.location,
                      size: adsItem?.size,
                    },
                    removeSelection: () => {
                      setIsImageSelected(false);
                      setImage(null);
                    },
                  })
                )
              }
              disabled={!isImageSelected}
            >
              {" Rasmni yuklash"}
            </Button>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full bg-white p-5 rounded-2xl'>
        {adsPayments && (
          <ProTable
            searchIndexes={searchIndexes}
            isSearch={false}
            tableName="To'lov"
            //   viewButtonUrl='/stores'
            createSubmitHandler={(reqBody) =>
              dispatch(
                createPayment({
                  data: {
                    fromDate: new Date(reqBody?.fromDate),
                    toDate: new Date(reqBody?.toDate),
                    adsItemId: +id,
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
                    adsItemId: +id,
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
            tableData={adsPayments}
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

export default AdsItemPage;
