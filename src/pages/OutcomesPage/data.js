import * as Yup from "yup";

export const fields = [
  {
    name: "name",
    type: "text",
    label: "Nomi",
    placeholder: "Kirim nomini kiriting...",
    isRequired: true,
  },
  {
    name: "description",
    type: "text",
    label: "Izoh",
    placeholder: "Izoh kiriting...",
  },
  {
    name: "price",
    type: "text",
    label: "Narxi",
    placeholder: "Narxini kiriting...",
    isRequired: true,
  },
  {
    name: "count",
    type: "number",
    label: "Soni",
    placeholder: "Sonini kiriting...",
  },
  {
    name: "categoryId",
    type: "select",
    label: "Kategoriya",
    placeholder: "Kategoriyani tanlang...",
    isRequired: true,
  },
];

export const emptyValues = {
  name: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nomi bo'sh bo'lmasligi kerak!"),
  description: Yup.string(),
  price: Yup.string()
    .matches(/^\d+$/, "Iltimos raqam kiriting!")
    .required("Narxi bo'sh bo'lmasligi kerak!"),
  count: Yup.string().matches(/^\d+$/, "Iltimos raqam kiriting!"),
  categoryId: Yup.mixed().required("Kategoriyani tanlash kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMI", uid: "name", sortable: true },
  { name: "NARXI", uid: "price", sortable: true },
  { name: "SONI", uid: "count", sortable: true },
  { name: "IZOH", uid: "description", sortable: true },

  { name: "SANASI", uid: "createdAt" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "price",
  "description",
  "createdAt",
  "count",
  "actions",
];
