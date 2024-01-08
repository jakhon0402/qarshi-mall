import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getMoneyPattern } from "../utils/regex";
import {
  clearIncomes,
  getAllIncomes,
  getAllIncomesByDateRange,
  getIncomeTotalPrice,
} from "./IncomesPage/incomesSlice";
import {
  clearOutcomes,
  getAllOutcomes,
  getAllOutcomesByDateRange,
  getOutcomeTotalPrice,
} from "./OutcomesPage/outcomesSlice";
import { dailyData, monthlyData } from "../utils/statistics";
import { DateRangePicker } from "rsuite";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  elements: {
    line: {
      tension: 0.19,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart",
    // },
  },
};

export const setChartDatas = (labels, data1, data2) => ({
  labels: [...labels],
  datasets: [
    {
      label: "Kirim",
      data: data1,
      borderColor: "#19A24A",
      backgroundColor: "#19A24A4d",
    },
    {
      label: "Chiqim",
      data: data2,
      borderColor: "#DC2425",
      backgroundColor: "#DC24254d",
    },
  ],
});

const StatisticsPage = () => {
  const [selectedKey, setSelectedKey] = useState("monthly");
  const [labels, setLabels] = useState(new Set([]));
  const [datas, setDatas] = useState(null);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const dispatch = useDispatch();
  const { totalPrice: incomeTotalPrice, incomes } = useSelector(
    (state) => state.incomes
  );
  const { totalPrice: outcomeTotalPrice, outcomes } = useSelector(
    (state) => state.outcomes
  );

  useEffect(() => {
    dispatch(getAllIncomes());
    dispatch(getAllOutcomes());
    dispatch(getIncomeTotalPrice());
    dispatch(getOutcomeTotalPrice());
  }, []);

  useEffect(() => {
    if (data1 && data2 && labels) {
      console.log(setChartDatas(labels, data1, data2));
      setDatas(setChartDatas(Array.from(labels), data1, data2));
    }
  }, [data1, data2, labels]);

  useEffect(() => {
    if (incomes && outcomes) {
      if (selectedKey == "monthly") {
        insertDatas(monthlyData(incomes), monthlyData(outcomes));
      } else if (selectedKey == "daily") {
        insertDatas(dailyData(incomes), dailyData(outcomes));
      }
    }
  }, [incomes, outcomes, selectedKey]);
  const insertDatas = (data1Object, data2Object) => {
    console.log(Object.keys(data1Object));
    console.log(Object.keys(data2Object));
    let keysArray = [
      ...new Set([
        ...Object.keys(data1Object).reverse(),
        ...Object.keys(data2Object).reverse(),
      ]),
    ];
    setLabels(keysArray);
    let data1 = [];
    let data2 = [];

    keysArray.forEach((key) => {
      if (key in data1Object) {
        data1.push(data1Object[key]);
      } else {
        data1.push(0);
      }

      if (key in data2Object) {
        data2.push(data2Object[key]);
      } else {
        data2.push(0);
      }
    });

    console.log(data1, data2);

    setData2([...data2]);

    setData1([...data1]);
  };

  return (
    <div className='flex flex-col w-full h-fit p-8 gap-8 bg-neutral-50'>
      <div className='flex flex-row w-full gap-8 items-center'>
        <span className='flex flex-col w-fit items-center bg-red-200/50 text-red-600 rounded-xl px-8 py-3'>
          Chiqim{" "}
          <span className='font-bold'>{`${
            outcomeTotalPrice == 0
              ? 0
              : outcomeTotalPrice
              ? getMoneyPattern(outcomeTotalPrice)
              : ""
          } so'm`}</span>
        </span>
        <span className='flex flex-col w-fit items-center bg-green-200/50 text-green-600 rounded-xl px-8 py-3'>
          Kirim{" "}
          <span className='font-bold'>{`${
            incomeTotalPrice == 0
              ? 0
              : incomeTotalPrice
              ? getMoneyPattern(incomeTotalPrice)
              : ""
          } so'm`}</span>
        </span>
      </div>
      <div className='flex flex-col w-full p-3 bg-white rounded-xl gap-5 mb-5'>
        <div className='flex flex-row justify-between'>
          <span className='font-bold text-[18px] text-primary'>
            Kirim/Chiqim statistikasi
          </span>
          <div className='flex flex-row items-center gap-5'>
            <DateRangePicker
              placement='bottomEnd'
              onChange={(date) => {
                if (date) {
                  dispatch(clearIncomes());
                  dispatch(clearOutcomes());
                  dispatch(
                    getAllIncomesByDateRange({
                      startDate: date[0].toISOString(),
                      endDate: date[1].toISOString(),
                    })
                  );
                  dispatch(
                    getAllOutcomesByDateRange({
                      startDate: date[0].toISOString(),
                      endDate: date[1].toISOString(),
                    })
                  );
                } else {
                  dispatch(getAllIncomes());
                  dispatch(getAllOutcomes());
                }
              }}
            />
            <Tabs color='primary' onSelectionChange={setSelectedKey}>
              <Tab key='monthly' title='Oylik' />
              <Tab key='daily' title='Kunlik' />
            </Tabs>
          </div>
        </div>

        {datas && labels && data1 && data2 && (
          <Line options={options} data={datas} className='w-full mb-10' />
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
