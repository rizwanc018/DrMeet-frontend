import { useEffect, useState } from "react"
import DepartmentCard from "./DepartmentCard"
import Spinner from "../Spinner"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AxiosBackend from "../../config/axios";

const Departments = () => {
  const [departments, setDepartments] = useState()


  const getAllDepartments = async () => {
    const response = await AxiosBackend.get('/api/user/departments')
    setDepartments(response.data.departments)
  }

  useEffect(() => {
    getAllDepartments()
  }, [])


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className=" md:flex justify-center py-20">
        <div className="md:w-[90%]">
          <div className="flex flex-col item-center">
            <h1 className="text-4xl font-semibold text-center">Our Specialities</h1>
            <div className='w-28 my-4 border-2 border-primary mx-auto'></div>
          </div>
          <Slider {...settings}>
            {
              departments ? (departments.map((department, i) => (
                <div key={i}>
                  <DepartmentCard department={department} />
                </div>))) :
                (
                  <div className="flex flex-wrap gap-5 justify-center my-8">
                    <Spinner />
                  </div>
                )
            }
          </Slider>
        </div>

      </div>
    </>
  )
}

export default Departments
