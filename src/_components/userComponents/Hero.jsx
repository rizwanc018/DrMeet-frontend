import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <div className='bg-primary-o h-[28rem] overflow-hidden relative'>
            <img src="/assets/bg.jpg" className="mix-blend-overlay object-right object-cover h-full w-full" alt="" />
            <div className='absolute top-20 md:top-1/3 px-5 md:start-28 text-black md:w-1/2'>
                <h1 className="text-4xl font-bold">DrMeet medical service</h1>
                <p className="mt-3 mb-8">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed vero tenetur inventore illo voluptas eum, totam id necessitatibus unde tempore, veritatis fuga dolor tempora optio?</p>
                <Link to='/doctors' className="border-primary p-3 px-6 mt-6 text-white text-xl bg-primary hover:bg-primary-600 active:bg-primary-600">Consult</Link>
            </div>
        </div>
    )
}

export default Hero