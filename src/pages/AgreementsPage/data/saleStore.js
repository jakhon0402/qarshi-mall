import * as Yup from "yup";

export const fields = [
  //   {
  //     name: "name",
  //     type: "text",
  //     label: "Nomi",
  //     placeholder: "Kategoriya nomini kiriting...",
  //     isRequired: true,
  //   },

  {
    name: "fullAmount",
    type: "number",
    label: "To'lov qiymati",
    placeholder: "To'lov qiymatini kiriting...",
    isRequired: true,
  },
  {
    name: "initialPayment",
    type: "number",
    label: "Boshlang'ich to'lov qiymati",
    placeholder: "Boshlang'ich to'lov qiymatini kiriting...",
    isRequired: true,
  },

  {
    name: "storeId",
    type: "customSelect",
    label: "Do'kon",
    placeholder: "Do'konni tanlang...",
    isRequired: true,
  },
];

export const emptyValues = {
  storeId: "",
  fullAmount: "",
  initialPayment: "",
};

export const validationSchema = Yup.object().shape({
  storeId: Yup.mixed().required("Bo'sh bo'lmasligi kerak!"),
  fullAmount: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  initialPayment: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "F.I.Sh", uid: "store.fullName", sortable: true },
  { name: "Do'kon raqami", uid: "store.storeNumber", sortable: true },
  { name: "Shartnoma raqami", uid: "store.contractNumber", sortable: true },
  // { name: "To'lov qiymati", uid: "fullAmount", sortable: true },
  // {
  //   name: "Boshlang'ich to'lov qiymati",
  //   uid: "initialPayment",
  //   sortable: true,
  // },
  { name: "SANASI", uid: "createdAt" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "store.fullName",
  "store.storeNumber",
  "store.contractNumber",
  // "fullAmount",
  // "initialPayment",
  "createdAt",
  "actions",
];

export const searchIndexes = [
  "fullName",
  "storeNumber",
  "contractNumber",
  "fullAmount",
  "initialPayment",
];
