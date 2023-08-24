import { useFormik } from "formik"
import { object, string, mixed } from 'yup'
import axios from "axios";
import Spinner from "../Spinner";
import { useEffect, useState } from "react"
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from "uuid"


function AddDepartmentForm() {

    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState()
    const [avatar, setAvatar] = useState(null)
    const [err, setErr] = useState()

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            image: "",
        },
        validationSchema: object({
            name: string().required("Required"),
            description: string().required('Required'),
            image: mixed().required('No image selected'),

        }),
        onSubmit: async (values) => {
            setSubmitting(true)
            try {
                setErr('')
                setSuccess('')
                await uploadAvatar()
                const response = await axios.post(`/api/admin/department/add`, { ...values })
                setSuccess(response.data.msg)
                values.name = ''
                formik.values.description = ''
                formik.values.image = ''
                setAvatar('')
            } catch (error) {
                console.error("Axios request error:", error);
                setErr(error.response.data.err)
            }
            setSubmitting(false)
        }
    })

    const uploadAvatar = async () => {
        if (!avatar) return
        const avatarRef = ref(storage, `departmentAvatar/${avatar.name + v4()}`)
        const response = await uploadBytes(avatarRef, avatar)
        const imgUrl = await getDownloadURL(avatarRef);
        formik.values.image = imgUrl
    }

    return (
        <div className="w-[32rem] rounded-xl p-8 mx-14 my-8 shadow-xl border border-primary">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-5 mb-5">
                    <div>
                        <label htmlFor="fname">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Department Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full"
                        />
                        {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows="4"
                            cols="30"
                        />
                        {formik.touched.description && formik.errors.description && <p className="error">{formik.errors.description}</p>}
                    </div>
                    <div className="my-5">
                        {avatar && <img className='border-2 rounded-full  border-primary' alt="Posts" width="100px" height="100px" src={`${avatar ? URL.createObjectURL(avatar) : ''}`}></img>}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={(e) => {
                                setAvatar(e.target.files[0])
                                formik.setFieldValue('image', e.target.files[0])
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.image && formik.errors.image && <p className="error">{formik.errors.image}</p>}
                    </div>
                </div>
                {!submitting ?
                    <button className='border-2 rounded px-5 py-2  border-primary text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white' type="submit" >
                        Save
                    </button>
                    : <Spinner className='ps-72' />
                }
                {success && <p className="mx-auto w-full text-center success mt-4 text-xl">{success}</p>}
                {err && <p className="mx-auto w-full text-center error mt-4 text-xl">{err}</p>}
            </form>
        </div>
    )
}

export default AddDepartmentForm