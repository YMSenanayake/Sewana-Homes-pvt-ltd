import { Link } from "react-router-dom";
import { assets } from "../assets/data";

const Footer = () => {
    return (
        <footer className="pt-16 xl:pt-20 w-full text-gray-500 bg-primary">
            <div className='max-padd-container'>
                <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                    <div className='max-w-80'>
                        {/* logo */}
                        <div className="flex flex-1">
                            <Link to={'/'} className='flex items-end'>
                                <img src={assets.logoImg} alt="logoImg" className='h-30' />
                                <span></span>
                            </Link>
                        </div>
                        <p className='text-sm'>
                            Through our Water Lily website, you can purchase high-quality water lily products safely and with confidence. Quality and customer satisfaction are our top priorities.

                        </p>
                        <div className='flex items-center gap-3 mt-7'>
                           <a href="https://www.facebook.com/share/14Qo1c9toG7/" ><img src={assets.facebook} alt="" /> </a>
                            <img src={assets.instagram} alt="" />
                           <a href="https://www.tiktok.com/@.water.lily3?_r=1&_t=ZS-91hRq1Af0Lw"> <img src={assets.Tiktok} alt="" /></a>
                        </div>
                    </div>

                    <div>
                        <p className='h4 text-black/80'>COMPANY</p>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><a href="https://maps.app.goo.gl/1ryP96xeJ6BNH9R7A?g_st=aw">Location</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <p className='h4 text-black/80'>SUPPORT</p>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><a href="https://wa.me/94718881197">Help Center</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className='max-w-80'>
                        <p className='h4 text-black/80'>STAY UPDATED</p>
                        <p className='mt-3 text-sm'>
                            Subscribe to our newsletter for inspiration and special offers.
                        </p>
                        <div className='flex items-center border pl-4 gap-2 bg-secondary/10 border-gray-500/30 has-[46px] rounded-full overflow-hidden max-w-md w-full mt-6'>
                            <input type="text" className='w-full h-full outline-none text-sm text-gray-500' placeholder='Your email' />
                            <button className='btn-dark font-medium !px-3.5 py-2 mr-0.5'>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5 mt-8'>
                    <p>© {new Date().getFullYear()} <a href="">උත්තමා water lily</a>. All rights reserved.</p>
                    
                </div>
            </div>
        </footer>
    );
};


export default Footer