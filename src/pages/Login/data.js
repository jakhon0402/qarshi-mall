import * as Yup from "yup";

export const emptyValues = {
  username: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required"),
});
