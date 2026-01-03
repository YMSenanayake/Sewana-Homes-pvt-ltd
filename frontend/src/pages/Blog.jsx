import React from 'react'
import { blogs } from '../assets/data'

function Blog() {
    return (
        <div className='bg-primary pt-48 pb-28'>
            <div className='max-padd-containers'>
                {/* container */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-12'>
                    {blogs.map((blog, index) => (
                        <div key={index} className='relative'>
                            <div className='bg-secondary/10 p-4 rounded-2xl'>
                                <img src={blog.image} alt="" className='shadow-xl shadow-slate-900/20 rounded-xl' />
                            </div>
                            {/* <p className='medium-14 mt-6'>{blog.category}</p> */}
                            <h5 className='h5 pr-4 mb-1 line-clamp-2'>{blog.title}</h5>
                            <p>{blog.description}</p>
                            <a href={blog.link} className='underline mt-2 bold-14 line-clamp-2'>
                                continue reading
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Blog
