import * as Yup from "yup";

export const fields = [
  {
    name: "clientName",
    type: "string",
    label: "Klient nomi",
    placeholder: "Klient nomini kiriting...",
    isRequired: true,
  },

  {
    name: "contractNumber",
    type: "number",
    label: "Shartnoma raqami",
    placeholder: "Shartnoma raqamini kiriting...",
    isRequired: true,
  },

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
  clientName: "",
  contractNumber: "",
  paymentAmount: "",
  paidAmount: "",
  fromDate: "",
  toDate: "",
};

export const validationSchema = Yup.object().shape({
  clientName: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  contractNumber: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  paymentAmount: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  paidAmount: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  fromDate: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  toDate: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Klient nomi", uid: "clientName", sortable: true },
  { name: "Shartnoma raqami", uid: "contractNumber", sortable: true },
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
  "clientName",
  "contractNumber",
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
