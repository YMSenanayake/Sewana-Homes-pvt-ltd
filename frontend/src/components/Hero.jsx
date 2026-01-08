import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/data'

const Hero = () => {
    return (
        <section className='max-padd-container'>
            <div className="bg-[url('/src/assets/bg.gif')] bg-cover bg-center bg-no-repeat h-[89vh] w-full mt-38 rounded-2xl relative">
                {/* <div className="relative h-[89vh] w-full mt-38 rounded-2xl overflow-hidden">

             
                <video
                    src="/src/assets/bgVideo2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                /> 
                */}

                {/* Overlay Content */}
                <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-1 sm:pt-8 flex flex-col justify-between h-full">
                    <div className="max-w-3xl">
                        <h1 className='h1 !font-[400] capitalize'>Bring Nature's Beauty Home With Elegant Water Lilies</h1>
                        <h1>Freshly grown water lilies, delivered with care. Perfect for gardens, ponds, and decor.</h1>

                        <div className="flex">
                            <Link
                                to={'/collection'}
                                className="bg-secondary text-white text-xs font-medium capitalize pl-5 rounded-full flexCenter gap-x-2 mt-10 group"
                            >
                                Shop Water Lilies

                                {/* Change forward icon image to video if needed */}
                                <img
                                    src={assets.forward}
                                    alt=""
                                    width={41}
                                    className="bg-white rounded-full flexCenter p-2 m-1 group-hover:translate-x-3 transition-all duration-500"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white p-3 max-w-[200px] md:max-w-[249px] h-40 md:h-58 rounded-2xl mt-20 mb-5 relative z-10">
                        <div className='h-20 md:h-32 w-44 md:w-56  overflow-hidden'>
                            <img
                                src={assets.hero}
                                alt=""
                                className='h-30 object-cover w-full rounded-2xl'
                            />
                        </div>
                        <p className='text-[10px] md:text-[13px] pt-2'>
                            <b className='uppercase'>Live the Luxury You Deserve</b><br />
                            Extraordinary homes in the most sought-after locations.
                            <Link to={'/collection'}><b> Find Your Home</b></Link>
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero
