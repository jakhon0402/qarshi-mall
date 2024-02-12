import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createMonthlySalary,
  createMonthlySalaryPayment,
  deleteMonthlySalary,
  deleteMonthlySalaryPayment,
  getEmployee,
  setSalaryPayments,
  updateEmployeeSalary,
  updateMonthlySalary,
  updateMonthlySalaryPayment,
  uploadImage,
} from "./employeesSlice";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";
import date from "date-and-time";
import CreateModal from "../../components/Modals/CreateModal";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  emptyValuesSalaryMonth,
  fieldsSalaryMonth,
  salaryEmptyValues,
  salaryFields,
  salaryValidationSchema,
  searchIndexes,
  validationSchemaSalaryMonth,
} from "./salaryData";
import { Divider } from "rsuite";
import { getMoneyPattern } from "../../utils/regex";
import ProTable from "../../components/ProTable";
import { EyeIcon } from "@heroicons/react/24/outline";
import { getMonthName } from "../../utils/date";
import {
  emptyValuesSalaryPayment,
  fieldsSalaryPayment,
  paymentsColumns,
  payments_INITIAL_VISIBLE_COLUMNS,
  payments_searchIndexes,
  validationSchemaSalaryPayment,
} from "./salaryPayments";
import { getStoreImage } from "../../utils/utils";

const EmployeePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const { employee, monthlySalaries, salaryPayments, uploadLoading } =
    useSelector((state) => state.employees);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setIsImageSelected(true);
    }
  };

  useEffect(() => {
    dispatch(getEmployee(id));
  }, []);

  return (
    <div className='flex flex-col gap-5 p-5'>
      <div className='flex flex-col items-center bg-white rounded-xl p-5'>
        <div className='flex flex-row items-center justify-between w-full font-semibold text-black'>
          <div className='flex flex-row items-center gap-5'>
            <Avatar
              onClick={onOpen}
              color='primary'
              className='w-[60px] h-[60px] cursor-pointer'
              isBordered
              src={getStoreImage(employee?.fileEntity)}

              // size='sm'
              // name={`${employee?.name} ${employee?.surname}`}
              // description={employee?.jobDescription}
              // description="Product Designer"
            />
            <div className='flex flex-col'>
              <span className='text-[16px]'>{`${employee?.name} ${employee?.surname}`}</span>
              <span className='text-[14px] text-amber-600'>
                {employee?.jobDescription}
              </span>
            </div>
          </div>

          <div>
            <span className='mr-3'>{"Joriy maosh: "}</span>
            <span className='text-[18px] font-bold'>{`${getMoneyPattern(
              employee?.currentSalary
            )} so'm`}</span>
          </div>
          {/* <CreateModal
            handleSubmit={(reqBody) =>
              dispatch(
                updateEmployeeSalary({
                  id: employee?.id,
                  newSalary: reqBody?.newSalary,
                })
              )
            }
            initialValues={salaryEmptyValues}
            fields={salaryFields}
            validationSchema={salaryValidationSchema}
            btnText="Maoshni o'zgartirish"
          /> */}
        </div>
      </div>

      <div className='flex flex-col w-full bg-white p-5 rounded-2xl'>
        <Breadcrumbs size='lg' variant='solid'>
          <BreadcrumbItem onPress={() => setIsMonthSelected(false)}>
            Oylik maoshlar
          </BreadcrumbItem>
          {isMonthSelected && (
            <BreadcrumbItem className='font-bold'>
              {getMonthName(new Date(selectedMonth?.month * 1000).getMonth()) +
                "  " +
                date.format(new Date(selectedMonth?.month * 1000), "YYYY")}
            </BreadcrumbItem>
          )}
        </Breadcrumbs>
        {/* <span className='mb-8 text-[16px] font-bold text-black'>
          {"Oylik maoshlar jadvali"}
        </span> */}

        {!isMonthSelected && monthlySalaries && (
          <ProTable
            deleteSubmitHandler={(id) =>
              dispatch(deleteMonthlySalary({ smId: id }))
            }
            createSubmitHandler={(reqBody) =>
              dispatch(
                createMonthlySalary({
                  data: {
                    month: `${reqBody?.month}T05:00:00Z`,
                    workerId: +id,
                    status: "PROCESS",
                    paymentAmount: reqBody?.paymentAmount,
                    paidAmount: reqBody?.paidAmount,
                  },
                })
              )
            }
            editSubmitHandler={(reqBody) =>
              dispatch(
                updateMonthlySalary({
                  id: reqBody?.id,
                  data: {
                    month: `${reqBody?.month}T05:00:00Z`,
                    workerId: +id,
                    status: "PROCESS",
                    paymentAmount: reqBody?.paymentAmount,
                    paidAmount: reqBody?.paidAmount,
                  },
                })
              )
            }
            extraButton={(data) => (
              <button
                className='text-lg bg-green-100 p-2 rounded-xl text-default-400 cursor-pointer active:opacity-50'
                onClick={() => {
                  dispatch(setSalaryPayments(data?.monthlySalaryPayments));
                  setIsMonthSelected(true);
                  setSelectedMonth(data);
                }}
              >
                <EyeIcon className='w-[18px] text-green-500 stroke-[2px]' />
              </button>
            )}
            searchIndexes={searchIndexes}
            isSearch={false}
            tableName='Oylik maosh'
            createData={{
              fields: fieldsSalaryMonth,
              initialValues: emptyValuesSalaryMonth,
              validationSchema: validationSchemaSalaryMonth,
            }}
            //   viewButtonUrl='/stores'

            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            tableData={monthlySalaries}
            editData={{
              fields: fieldsSalaryMonth,
              initialValues: (data) => ({
                ...data,
                month: date.format(new Date(data?.month * 1000), "YYYY-MM-DD"),
              }),
              validationSchema: validationSchemaSalaryMonth,
            }}
          />
        )}
        {isMonthSelected && monthlySalaries && (
          <ProTable
            deleteSubmitHandler={(id) =>
              dispatch(deleteMonthlySalaryPayment({ smpId: id }))
            }
            createSubmitHandler={(reqBody) =>
              dispatch(
                createMonthlySalaryPayment({
                  data: {
                    paymentAmount: reqBody?.paymentAmount,
                    monthlySalaryId: +selectedMonth?.id,
                  },
                })
              )
            }
            editSubmitHandler={(reqBody) =>
              dispatch(
                updateMonthlySalaryPayment({
                  id: reqBody?.id,
                  data: {
                    paymentAmount: reqBody?.paymentAmount,
                    monthlySalaryId: +selectedMonth?.id,
                  },
                })
              )
            }
            // extraButton={(data) => (
            //   <button
            //     className='text-lg bg-green-100 p-2 rounded-xl text-default-400 cursor-pointer active:opacity-50'
            //     onClick={() => {
            //       setIsMonthSelected(true);
            //       setSelectedMonth(data);
            //     }}
            //   >
            //     <EyeIcon className='w-[18px] text-green-500 stroke-[2px]' />
            //   </button>
            // )}
            searchIndexes={payments_searchIndexes}
            isSearch={false}
            tableName="Maosh to'lov"
            //   viewButtonUrl='/stores'
            createData={{
              fields: fieldsSalaryPayment,
              initialValues: emptyValuesSalaryPayment,
              validationSchema: validationSchemaSalaryPayment,
            }}
            editData={{
              fields: fieldsSalaryPayment,
              initialValues: (data) => ({
                ...data,
                // month: date.format(new Date(data?.month * 1000), "YYYY-MM-DD"),
              }),
              validationSchema: validationSchemaSalaryPayment,
            }}
            columns={paymentsColumns}
            initialVisibleColumns={payments_INITIAL_VISIBLE_COLUMNS}
            tableData={salaryPayments}
          />
        )}

        {employee?.salaryChanges &&
          employee?.salaryChanges.map((sc, index) => (
            <div className='flex flex-col w-full text-black'>
              <div className='flex flex-row justify-between'>
                <span className='font-bold'>{`${
                  sc?.newSalary ? getMoneyPattern(sc?.newSalary) : ""
                } so'm`}</span>
                <span>
                  {date.format(
                    new Date(sc?.changeDate),
                    "ddd, MMM DD YYYY HH:mm"
                  )}
                </span>
              </div>
              {employee?.salaryChanges.length - 1 != index && (
                <Divider orientation='vertical' className='my-2' />
              )}
            </div>
          ))}
      </div>

      <Modal
        // size='4xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        className='text-black'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {"Rasm yuklash"}
              </ModalHeader>
              <ModalBody className='flex flex-row'>
                <div className='flex flex-col items-center w-full gap-5 py-3 px-5'>
                  {/* {label && (
                    <span className='text-[16px] font-semibold font-space mb-[-30px]'>
                      {label}
                    </span>
                  )} */}
                  <input
                    onChange={handleFileChange}
                    type='file'
                    name='avatar'
                    id={employee?.id}
                    className={"w-full invisible h-0 overflow-hidden"}
                    accept='image/*'
                  />
                  <label
                    htmlFor={employee?.id}
                    // onMouseEnter={() => setIsImgHover(true)}
                    // onMouseLeave={() => setIsImgHover(false)}
                    className='group w-fit'
                  >
                    <div
                      className={
                        "w-[300px] h-[300px] relative rounded-[30px] overflow-hidden"
                      }
                    >
                      <img
                        src={
                          image === null
                            ? getStoreImage(employee?.fileEntity)
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
                            workerData: {
                              id: employee?.id,
                              name: employee?.name,
                              surname: employee?.surname,
                              currentSalary: employee?.currentSalary,
                              jobDescription: employee?.jobDescription,
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
                    {/* {imageData != null && (
                      <DeleteModal
                        button={
                          isCompact ? (
                            <DeleteButton />
                          ) : (
                            <DeleteButtonText>{"O'chirish"}</DeleteButtonText>
                          )
                        }
                        contextText={`Avatarni `}
                        handleSubmit={() =>
                          dispatch(deleteImage({ url: deleteUrl }))
                        }
                      />
                    )} */}
                  </div>
                </div>
                {/* <div className='flex flex-col w-[300px] gap-3'>
                  <img
                    className='w-full h-[300px] object-cover rounded-2xl'
                    src='https://bsmi.uz/wp-content/uploads/2021/12/empty-img.png'
                  />
                  <Button>{"Rasm yuklash"}</Button>
                </div> */}
              </ModalBody>
              <ModalFooter>
                {/* <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EmployeePage;
