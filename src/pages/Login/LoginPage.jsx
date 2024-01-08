import React from "react";
import { Formik } from "formik";
import { Button, Input } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { emptyValues, validationSchema } from "./data";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const dispatch = useDispatch();

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-primary/80'>
      <div className='flex flex-col text-black items-center bg-white w-[400px] p-8 rounded-[40px]'>
        <div className='bg-primary w-fit p-3 rounded-2xl'>
          {" "}
          <Logo />
        </div>
        <span className='text-[18px] mt-5 font-semibold'>Kirish</span>
        <Formik
          enableReinitialize
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={emptyValues}
          validationSchema={validationSchema}
          //   onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue,
          }) => (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                console.log(values);
                dispatch(
                  login({ data: values, navigate: () => navigate("/") })
                );
              }}
              className='flex flex-col gap-5 w-full font-madefor mt-8'
            >
              <Input
                value={values?.username}
                type='text'
                style={{ color: "black", fontWeight: 500 }}
                name='username'
                placeholder='Usernameni kiriting...'
                label='Username'
                onChange={handleChange}
              />
              <Input
                value={values?.password}
                name='password'
                style={{ color: "black", fontWeight: 500 }}
                label='Parol'
                placeholder='Parolni kiriting...'
                onChange={handleChange}
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashIcon className='w-[20px] text-2xl text-default-400 pointer-events-none' />
                    ) : (
                      <EyeIcon className='w-[20px] text-2xl text-default-400 pointer-events-none' />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              <Button type='submit' color='primary'>
                {"Kirish"}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
