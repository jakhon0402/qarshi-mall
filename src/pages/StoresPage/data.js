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
    name: "fullName",
    type: "text",
    label: "F.I.Sh",
    placeholder: "F.I.Sh ni kiriting...",
    isRequired: true,
  },
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
    name: "storeNumber",
    type: "number",
    label: "Do'kon raqami",
    placeholder: "Do'kon raqamini kiriting...",
    isRequired: true,
  },
  {
    name: "size",
    type: "number",
    label: "Do'kon o'lchami - m²",
    placeholder: "Do'kon o'lchamini kiriting...",
    isRequired: true,
  },
  {
    name: "contractNumber",
    type: "number",
    label: "Shartnoma raqami",
    placeholder: "Shartnoma raqamini kiriting...",
    isRequired: true,
  },
];

export const emptyValues = {
  fullName: "",
  fullAmount: "",
  initialPayment: "",
  storeNumber: "",
  contractNumber: "",
};

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  fullAmount: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  initialPayment: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  storeNumber: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
  contractNumber: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "F.I.Sh", uid: "fullName", sortable: true },
  { name: "Do'kon raqami", uid: "storeNumber", sortable: true },
  { name: "Shartnoma raqami", uid: "contractNumber", sortable: true },
  { name: "To'lov qiymati", uid: "fullAmount", sortable: true },
  {
    name: "Boshlang'ich to'lov qiymati",
    uid: "initialPayment",
    sortable: true,
  },
  { name: "SANASI", uid: "createdAt" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "fullName",
  "storeNumber",
  "contractNumber",
  "fullAmount",
  "initialPayment",
  "createdAt",
  "actions",
];
