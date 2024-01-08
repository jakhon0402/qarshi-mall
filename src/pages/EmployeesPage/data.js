import * as Yup from "yup";

export const salaryFields = [
  {
    name: "newSalary",
    type: "number",
    label: "Yangi maosh",
    placeholder: "Yangi maoshni kiriting...",
  },
];

export const salaryEmptyValues = {
  newSalary: 0,
};

export const salaryValidationSchema = Yup.object().shape({
  newSalary: Yup.number().required("Boshlang'ich maosh is required"),
});

export const fields = [
  {
    name: "name",
    type: "text",
    label: "Ismi",
    placeholder: "Ismini kiriting...",
    isRequired: true,
  },
  {
    name: "surname",
    type: "text",
    label: "Familiya",
    placeholder: "Familiyani kiriting...",
    isRequired: true,
  },
  {
    name: "jobDescription",
    type: "text",
    label: "Kasbi",
    placeholder: "Kasbini kiriting...",
  },
  {
    name: "currentSalary",
    isRequired: true,
    type: "text",
    label: "Boshlang'ich maosh",
    placeholder: "Narxini kiriting...",
  },
];

export const emptyValues = {
  name: "",
  surname: "",
  currentSalary: 0,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ismi bo'sh bo'lmasligi kerak!"),
  surname: Yup.string().required("Familiyasi bo'sh bo'lmasligi kerak!"),
  currentSalary: Yup.string()
    .matches(/^\d+$/, "Iltimos raqam kiriting!")
    .required("Boshlang'ich bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Familiyasi", uid: "surname", sortable: true },
  { name: "Ismi", uid: "name", sortable: true },
  { name: "KASBI", uid: "jobDescription", sortable: true },
  { name: "MAOSH", uid: "currentSalary", sortable: true },
  { name: "MAOSH BERILISH VAQTI", uid: "salaryDate", sortable: true },

  { name: "SANASI", uid: "createdAt" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "surname",
  "currentSalary",
  "jobDescription",
  "salaryDate",
  "createdAt",
  "actions",
];
