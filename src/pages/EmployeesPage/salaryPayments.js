import * as Yup from "yup";

export const fieldsSalaryPayment = [
  {
    name: "paymentAmount",
    type: "number",
    label: "To'lov qiymati",
    placeholder: "To'lov qiymatini kiriting...",
    isRequired: true,
  },
];

export const emptyValuesSalaryPayment = {
  paymentAmount: "",
};

export const validationSchemaSalaryPayment = Yup.object().shape({
  paymentAmount: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
});

export const paymentsColumns = [
  { name: "ID", uid: "id", sortable: true },
  // { name: "Oy", uid: "month", sortable: true },
  { name: "To'lov qiymati", uid: "paymentAmount", sortable: true },
  // { name: "Status", uid: "paymentStatus", sortable: true },
  // { name: "Progress", uid: "paymentProgress", sortable: true },
  // { name: "To'langan qiymati", uid: "paidAmount", sortable: true },
  // { name: "Qarzdorlik qiymati", uid: "debtAmount", sortable: true },

  { name: "SANASI", uid: "createdAt", sortable: true },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const payments_INITIAL_VISIBLE_COLUMNS = [
  "id",
  "paymentAmount",
  // "paidAmount",
  // "debtAmount",
  // "paymentStatus",
  // "paymentProgress",

  // "month",
  "createdAt",
  "actions",
];

export const payments_searchIndexes = ["newPayment", "createdAt"];
