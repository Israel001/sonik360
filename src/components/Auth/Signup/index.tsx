import { useField, useForm } from '@shopify/react-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appcontext';
import preventPage from '../../../hoc/preventPage';
import { login } from '../../../utils/util';
import InputCom from '../../Helpers/InputCom';
import Layout from '../../Partials/Layout';
import Thumbnail from './Thumbnail';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [checked, setValue] = useState(false);
  const rememberMe = () => {
    setValue(!checked);
  };

  const { setIsLoggedIn } = useAppContext();

  const { fields, dirty, submit, submitting } = useForm({
    fields: {
      firstname: useField({
        value: '',
        validates: (value) => {
          if (!value) return 'First name is required';
          if (value.length > 50) return 'First name is too long';
        },
      }),
      lastname: useField({
        value: '',
        validates: (value) => {
          if (!value) return 'Last name is required';
          if (value.length > 50) return 'Last name is too long';
        },
      }),
      email: useField({
        value: '',
        validates: (value) => {
          if (!value) return 'Email is required';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return 'Email should be a valid email address';
        },
      }),
      phone: useField({
        value: '',
        validates: (value) => {
          if (!value) return 'Phone number is required';
          if (value.length > 15) return 'Provide a valid phone number';
        },
      }),
      password: useField({
        value: '',
        validates: (value) => {
          if (!value) return 'Password is required';
          if (value.length < 6) return 'Password is too short';
          if (value.length > 50) return 'Password is too long';
          if (value === fields.confirmPassword.value) fields.confirmPassword.setError('');
        },
      }),
      confirmPassword: useField({
        value: '',
        validates: (value) => {
          if (!value) return 'Password confirmation is required';
          if (value !== fields.password.value)
            return 'Passwords does not match';
        }
      }),
      address: useField({
        value: '',
        validates: (value) => {
          if (!value) return 'Address is required';
          if (value.length > 200) return 'Address is too long';
        },
      }),
    },
    onSubmit: async (fieldValues) => {
      console.log('fieldvalues', fieldValues);
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname: fieldValues.firstname,
          lastname: fieldValues.lastname,
          phone: fieldValues.phone,
          email: fieldValues.email,
          password: fieldValues.password,
          address: fieldValues.address
        })
      }).then((response) => response.json());
      console.log('response', response);
      if (response.message) {
        alert(response.message);
      } else {
        const result = await login(fieldValues.email, fieldValues.password);
        if (result) {
          setIsLoggedIn(true);
          navigate("/");
        }
      }
      return { status: 'success' };
    },
  });

  const hasValidationError = Object.entries(fields).some(([_k, v]) => {
    return !v.touched || (v.touched && v.error);
  });

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Create Account
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                    <InputCom
                      placeholder="Demo Name"
                      label="First Name*"
                      name="fname"
                      type="text"
                      inputClasses="h-[50px]"
                      inputAttr={fields.firstname}
                    >
                      {fields.firstname.error && (
                        <span style={{ color: 'red' }}>
                          {fields.firstname.error}
                        </span>
                      )}
                    </InputCom>

                    <InputCom
                      placeholder="Demo Name"
                      label="Last Name*"
                      name="lname"
                      type="text"
                      inputClasses="h-[50px]"
                      inputAttr={fields.lastname}
                    >
                      {fields.lastname.error && (
                        <span style={{ color: 'red' }}>
                          {fields.lastname.error}
                        </span>
                      )}
                    </InputCom>
                  </div>
                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                    <InputCom
                      placeholder="Demo@gmail.com"
                      label="Email Address*"
                      name="email"
                      type="email"
                      inputClasses="h-[50px]"
                      inputAttr={fields.email}
                    >
                      {fields.email.error && (
                        <span style={{ color: 'red' }}>
                          {fields.email.error}
                        </span>
                      )}
                    </InputCom>

                    <InputCom
                      placeholder="0213 *********"
                      label="Phone*"
                      name="phone"
                      type="text"
                      inputClasses="h-[50px]"
                      inputAttr={fields.phone}
                    >
                      {fields.phone.error && (
                        <span style={{ color: 'red' }}>
                          {fields.phone.error}
                        </span>
                      )}
                    </InputCom>
                  </div>

                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Your password here"
                      label="Password*"
                      name="password"
                      type="password"
                      inputClasses="h-[50px]"
                      inputAttr={fields.password}
                    >
                      {fields.password.error && (
                        <span style={{ color: 'red' }}>
                          {fields.password.error}
                        </span>
                      )}
                    </InputCom>
                  </div>

                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Confirm your password here"
                      label="Confirm Password*"
                      name="confirm-password"
                      type="password"
                      inputClasses="h-[50px]"
                      inputAttr={fields.confirmPassword}
                    >
                      {fields.confirmPassword.error && (
                        <span style={{ color: 'red' }}>
                          {fields.confirmPassword.error}
                        </span>
                      )}
                    </InputCom>
                  </div>

                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Your address Here"
                      label="Address*"
                      name="address"
                      type="text"
                      inputClasses="h-[50px]"
                      inputAttr={fields.address}
                    >
                      {fields.address.error && (
                        <span style={{ color: 'red' }}>
                          {fields.address.error}
                        </span>
                      )}
                    </InputCom>
                  </div>
                  <div className="forgot-password-area mb-7">
                    <div className="remember-checkbox flex items-center space-x-2.5">
                      <button
                        onClick={rememberMe}
                        type="button"
                        className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                      >
                        {checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <span
                        onClick={rememberMe}
                        className="text-base text-black"
                      >
                        I agree all
                        <span className="text-qblack">tarm and condition</span>
                        in BigShop.
                      </span>
                    </div>
                  </div>
                  <div className="signin-area mb-3">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="black-btn text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        style={
                          hasValidationError || !dirty || submitting
                            ? { opacity: '.5' }
                            : {}
                        }
                        disabled={hasValidationError || !dirty || submitting}
                        onClick={submit}
                      >
                        <span>Create Account</span>
                      </button>
                    </div>
                  </div>

                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Alrady have an Account?
                      <a href="/login" className="ml-2 text-qblack">
                        Log In
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: 'calc(50% - 258px)' }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default preventPage(Signup)