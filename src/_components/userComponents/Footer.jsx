import { Link } from "react-router-dom"
import { AiFillFacebook, AiFillLinkedin } from 'react-icons/ai'
import { FaTwitterSquare, FaGooglePlusSquare, FaYoutubeSquare } from 'react-icons/fa'


const Footer = () => {
    return (
        <div className="bg-primary-100 border-t-2 border-primary-200 mt-10">
            <div className="w-4/5 flex justify-center pt-5  mx-auto ">
                <div className='w-full flex flex-col md:flex-row items-start  md:justify-between py-10 text-gray-500'>
                    <div className="flex-1">
                        <h2 className="font-semibold text-xl text-gray-700 mb-0 md:mb-3">Location</h2>
                        <p className="font-semibold">Address:</p>
                        <p>1603 Old York Rd,</p>
                        <p>Houma, LA, 75429</p>
                        <p className="mt-2"><span className="font-semibold">Phone:</span>+91 90876 54321</p>
                        <p><span className="font-semibold">Fax:</span>+91 90876 54321</p>
                    </div>
                    <div className="flex-1 mt-3 md:mt-0">
                        <h2 className="font-semibold text-xl text-gray-700 mb-0 md:mb-3">Sitemap</h2>
                        <ul>
                            <li><Link className="hover:text-primary" to='/'>Home</Link></li>
                            <li><Link className="hover:text-primary" to='/doctors'>Doctors</Link></li>
                            <li><Link className="hover:text-primary" to='/doctor/login'>For Doctors</Link></li>
                            <li><a className="hover:text-primary" href='#aboutUs'>About Us</a></li>
                        </ul>
                    </div>
                    <div className="flex-1 mt-3 md:mt-0">
                        <h2 className="font-semibold text-xl text-gray-700 mb-0 md:mb-3">Blog</h2>
                        <ul>
                            <li>Right Blog</li>
                            <li>Left Blog</li>
                            <li>Bottom Blog</li>
                            <li>Top Blog</li>
                            <li>Blog Details</li>
                        </ul>
                    </div>
                    <div className="flex-1 mt-3 md:mt-0">
                        <h2 className="font-semibold text-xl text-gray-700 mb-0 md:mb-3">Appointment</h2>
                        <p className="w-4/5">Lorem ipsum dolor sit, amet consectetur Ipsa, quis.</p>
                        <div className="flex justify-between text-3xl text-primary mt-2 w-4/5">
                            <AiFillFacebook />
                            <FaTwitterSquare />
                            <AiFillLinkedin />
                            <FaGooglePlusSquare />
                            <FaYoutubeSquare />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer