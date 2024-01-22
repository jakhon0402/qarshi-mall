import * as Yup from "yup";

export const fields = [
  {
    name: "paymentAmount",
    type: "number",
    label: "To'lov qiymati",
    placeholder: "To'lov qiymatini kiriting...",
    isRequired: true,
  },
  {
    name: "paidAmount",
    type: "number",
    label: "To'langan qiymat",
    placeholder: "To'langan qiymatni kiriting...",
    isRequired: true,
  },
  {
    name: "fromDate",
    type: "date",
    label: "Sanadan",
    placeholder: "Boshlanish sanasini kiriting...",
    isRequired: true,
  },
  {
    name: "toDate",
    type: "date",
    label: "Sanagacha",
    placeholder: "Tugash sanasini kiriting...",
    isRequired: true,
  },
];

export const emptyValues = {
  paymentAmount: "",
  paidAmount: "",
  fromDate: "",
  toDate: "",
};

export const validationSchema = Yup.object().shape({
  paymentAmount: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  paidAmount: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  fromDate: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  toDate: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Sanadan", uid: "fromDate", sortable: true },
  { name: "Sanagacha", uid: "toDate", sortable: true },
  { name: "To'lov qiymati", uid: "paymentAmount", sortable: true },
  { name: "Status", uid: "paymentStatus", sortable: true },
  { name: "Progress", uid: "paymentProgress", sortable: true },
  { name: "To'langan qiymati", uid: "paidAmount", sortable: true },
  { name: "Qarzdorlik qiymati", uid: "debtAmount", sortable: true },

  { name: "SANASI", uid: "createdAt", sortable: true },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "paymentAmount",
  "paidAmount",
  "debtAmount",
  "paymentStatus",
  "paymentProgress",
  "fromDate",
  "toDate",
  "createdAt",
  "actions",
];

export const searchIndexes = ["newPayment", "createdAt"];
