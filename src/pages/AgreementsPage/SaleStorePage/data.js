import * as Yup from "yup";

export const fields = [
  {
    name: "newPayment",
    type: "number",
    label: "To'lov qiymati",
    placeholder: "To'lov qiymatini kiriting...",
    isRequired: true,
  },
];

export const emptyValues = {
  newPayment: "",
};

export const validationSchema = Yup.object().shape({
  newPayment: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "To'lov qiymati", uid: "newPayment", sortable: true },

  { name: "SANASI", uid: "createdAt" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "newPayment",
  "createdAt",
  "actions",
];

export const searchIndexes = ["newPayment", "createdAt"];
