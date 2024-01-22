import * as Yup from "yup";

export const fieldsRent = [
  {
    name: "rentingAmount",
    type: "number",
    label: "Arenda to'lov qiymati",
    placeholder: "Arenda to'lov qiymatini kiriting...",
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

export const emptyValuesRent = {
  storeId: "",
  rentingAmount: "",
};

export const validationSchemaRent = Yup.object().shape({
  storeId: Yup.mixed().required("Bo'sh bo'lmasligi kerak!"),
  rentingAmount: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
});

export const columnsRent = [
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

export const INITIAL_VISIBLE_COLUMNS_RENT = [
  "id",
  "store.fullName",
  "store.storeNumber",
  "store.contractNumber",
  // "fullAmount",
  // "initialPayment",
  "createdAt",
  "actions",
];

export const searchIndexesRent = [
  "fullName",
  "storeNumber",
  "contractNumber",
  "fullAmount",
  "initialPayment",
];
