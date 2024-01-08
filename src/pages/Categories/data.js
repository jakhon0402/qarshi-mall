import * as Yup from "yup";

export const fields = [
  {
    name: "name",
    type: "text",
    label: "Nomi",
    placeholder: "Kategoriya nomini kiriting...",
    isRequired: true,
  },
];

export const emptyValues = {
  name: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nomi bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMI", uid: "name", sortable: true },
  { name: "SANASI", uid: "createdAt" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = ["id", "name", "createdAt", "actions"];
