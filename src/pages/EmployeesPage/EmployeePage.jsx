import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployee, updateEmployeeSalary } from "./employeesSlice";
import { User } from "@nextui-org/react";
import date from "date-and-time";
import CreateModal from "../../components/Modals/CreateModal";
import {
  salaryEmptyValues,
  salaryFields,
  salaryValidationSchema,
} from "./data";
import { Divider } from "rsuite";
import { getMoneyPattern } from "../../utils/regex";

const EmployeePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployee(id));
  }, []);

  return (
    <div className='flex flex-col gap-5 p-5'>
      <div className='flex flex-col items-center bg-white rounded-xl p-5'>
        <div className='flex flex-row justify-between w-full font-semibold text-black'>
          <User
            // size='sm'
            name={`${employee?.name} ${employee?.surname}`}
            description={employee?.jobDescription}
            // description="Product Designer"
          />
          <CreateModal
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
          />
        </div>
      </div>

      <div className='flex flex-col w-full bg-white p-5 rounded-2xl'>
        <span className='mb-8 text-[16px] font-bold text-black'>
          {"Maosh o'zgarishlar tarixi"}
        </span>
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
    </div>
  );
};

export default EmployeePage;
