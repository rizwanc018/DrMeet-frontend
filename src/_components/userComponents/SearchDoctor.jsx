import { useFormik } from "formik"
import {object, string} from 'yup'
import { useState } from "react";
import AxiosBackend from '../../config/axios'
import Spinner from "../Spinner";

const SearchDoctor = ({ setDoctors }) => {
    const [submitting, setSubmitting] = useState(false)
    const [err, setErr] = useState()

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        validationSchema: object({
            search: string(),
        }),
        onSubmit: async (values) => {
            setSubmitting(true)
            setErr('')

            try {
                const response = await AxiosBackend.get(`/api/user/doctors/search?q=${values.search}`)
                setDoctors(response.data.doctors)
            } catch (error) {
                setErr(error.response.data.err)
            }
            setSubmitting(false)
        }
    })

    return (
        <form
            className="flex gap-2"
            onSubmit={formik.handleSubmit}
        >
            <div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="search"
                    value={formik.values.search}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            {!submitting ?
                <button className='border-2 rounded-xl p-2  border-primary text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white' type="submit" >
                    Search</button>
                : <Spinner className='ps-72' />
            }
        </form>
    )
}

export default SearchDoctor