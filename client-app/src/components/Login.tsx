import { LockClosedIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react";
import { useStore } from "../stores/store";
import { FormikErrors, useFormik } from "formik";
import ErrorMsg from "./errors/ErrorMsg";
import Button from "./buttons/Button";

interface FormValues {
    email: string;
    password: string;
  }

const validate = (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }
   
    return errors;
  };

export default observer(function Login() {

    const { userStore } = useStore();

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          error: null,
        },
        validate,
        onSubmit: (values, { setErrors }) => {
            
            userStore.login(values).catch(
                error => setErrors({ error: "Invalid email or password" })).finally(()=>formik.setSubmitting(false));
                //formik.setSubmitting(false);
        }

      });

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-black-700 uppercase">
                    Log in
                </h1>

                  
                        <form className="mt-6" onSubmit={formik.handleSubmit} autoComplete="false" >
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your email"
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            {formik.touched.email && formik.errors.email ? <ErrorMsg errorMsg={formik.errors.email} /> : null}

                            <div className="mb-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    id="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    type="password"
                                    placeholder="Enter password"
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            {formik.touched.password && formik.errors.password ? <ErrorMsg errorMsg={formik.errors.password} />  : null}

                            <a href="#" className="text-xs text-black-600 hover:underline">
                                Forget Password?
                            </a>
                            <div className="mt-6">
                                <Button content="Login" type="submit" loadingText="Logging in..." loading={formik.isSubmitting} />
                            </div>
                            {formik.errors.error ? <div style={{marginTop: 10}}><ErrorMsg errorMsg={formik.errors.error!} /></div>  : null}
                        </form>

                    
                

                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className="flex mt-4 gap-x-2">

                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Register
                    </button>

                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-black-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>

    );
})