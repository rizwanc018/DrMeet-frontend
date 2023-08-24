import { useFormik } from "formik"
import { object, string } from 'yup'
import { useEffect, useState, useRef } from "react";
import AxiosBackend from '../../config/axios'
import Spinner from "../Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";

function DoctorLoginForm() {

    const [submitting, setSubmitting] = useState(false)
    const [err, setErr] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const emailRef = useRef()

    const { userInfo } = useSelector(state => state.auth)
  
    useEffect(() => {
      emailRef.current.focus()
    }, [])

    useEffect(() => {
        if (userInfo && userInfo.isDoctor) navigate('/doctor/')
    }, [])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: object({
            email: string().email('Invalid email').required('Required'),
            password: string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            setSubmitting(true)
            setErr('')

            try {
                const response = await AxiosBackend.post(`/api/doc/auth`, { ...values })
                dispatch(setCredentials({ ...response.data }))
                navigate('/doctor')
            } catch (error) {
                setErr(error.response.data.err)
            }
            setSubmitting(false)
        }
    })


    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto flex justify-center">
                <div className="w-fit  md:w-1/2 rounded p-10 shadow-xl border-solid border-2 border-primary">
                    <img src="/assets/logo.png" className="mb-4" alt="" />
                    <h2 className="text-xl text-primary-600 mb-6 font-semibold ">Doctor Login</h2>
                    {/* fname and lname */}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 mb-5">


                            {/* Email and mobile */}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    ref={emailRef}
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
                            </div>

                            {/* password */}
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Passowrd"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}
                            </div>

                        </div>
                        {!submitting ?
                            <button className='border-2 rounded px-5 py-2  border-primary text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white' type="submit" >
                                Login</button>
                            : <Spinner className='ps-72' />
                        }
                        {err && <p className="mx-auto w-full text-center error mt-4 text-xl">{err}</p>}
                    </form>
                    <p className="mt-6">Not Registered? <Link to='/doctor/register' className="text-primary-600">Register</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default DoctorLoginForm