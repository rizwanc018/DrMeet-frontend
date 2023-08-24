import { SlCalender } from 'react-icons/sl'
import { MdVideoCall } from 'react-icons/md';
import { AiOutlineRobot } from 'react-icons/ai';

const About = () => {
    return (
        <div id='aboutUs' className='w-full flex flex-col items-center py-24 bg-white'>
            <div className='px-4 md:w-3/5 md:px-0 flex text-center flex-col items-center mb-16'>
                <h1 className='text-4xl font-semibold'>About DrMeet</h1>
                <div className='w-28 my-4 border-2 border-primary'></div>
                <p className='text-lg text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit. Fusce vitae risus nec dui venenatis dignissim. Aenean vitae metus in augue pretium ultrices. Duis dictum eget dolor vel blandit.</p>
            </div>
            <div className='w-4/5 flex flex-col md:flex-row justify-between text-gray-500'>
                <div className='flex-1 flex flex-col items-center text-center md:pr-4'>
                    <SlCalender className='text-7xl' />
                    <h1 className='text-2xl font-semibold my-4 text-gray-900'>Book an Appointment</h1>
                    <p>Make online appointment with your favorite doctor, at your suitable time.</p>
                </div>
                <div className='flex-1 flex flex-col items-center text-center md:px-4 mt-8 md:mt-0'>
                    <MdVideoCall className='text-7xl' />
                    <h1 className='text-2xl font-semibold my-4 text-gray-900'>Consult with a Doctor</h1>
                    <p>Share your problems with your doctor from comfort of your home,</p>
                </div>
                <div className='flex-1 flex flex-col items-center text-center md:pl-4 mt-8 md:mt-0'>
                    <AiOutlineRobot className='text-7xl' />
                    <h1 className='text-2xl font-semibold my-4 text-gray-900'>Chat with AI Dietitian</h1>
                    <p>24/7 chat with our advanced AI clear your diet related doubts</p>
                </div>
            </div>
        </div>
    )
}

export default About;
