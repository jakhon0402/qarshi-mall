import * as Yup from "yup";

export const fields = [
  {
    name: "description",
    type: "text",
    label: "Description",
    placeholder: "Enter Description...",
    isRequired: true,
  },
  {
    name: "size",
    type: "text",
    label: "Size",
    placeholder: "Enter size...",
    isRequired: true,
  },
  {
    name: "location",
    type: "text",
    label: "Location",
    placeholder: "Enter Location...",
  },
];

export const emptyValues = {
  description: "",
  size: "",
  location: "",
  // currentSalary: 0,
};

export const validationSchema = Yup.object().shape({
  description: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  size: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  location: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  // currentSalary: Yup.string()
  //   .matches(/^\d+$/, "Iltimos raqam kiriting!")
  //   .required("Joriy maosh bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },

  { name: "Image", uid: "image" },
  { name: "Description", uid: "desctiption", sortable: true },
  { name: "Size", uid: "size", sortable: true },
  { name: "Location", uid: "location", sortable: true },
  // { name: "MAOSH BERILISH VAQTI", uid: "salaryDate", sortable: true },

  { name: "SANASI", uid: "createdAt" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "description",
  "image",
  "size",
  "location",

  "createdAt",
  "actions",
];

export const searchIndexes = [
  "name",
  "surname",
  "currentSalary",
  "jobDescription",
  "salaryDate",
];
