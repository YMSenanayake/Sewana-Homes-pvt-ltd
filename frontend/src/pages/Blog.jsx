import React from 'react'

function Blog() {
    return (
        <div className='bg-primary pt-48 pb-28'>
            <div className='max-padd-containers'>
                {/* About Us Title */}
                <div className='mb-20 animate-bounce-in'>
                    <h2 className='text-4xl md:text-6xl font-bold mb-6 text-center bg-clip-text text-transparent' style={{ backgroundImage: 'linear-gradient(to right, #B88712, #D4A017)' }}>About Us</h2>
                    <div className='w-32 h-2 mx-auto mb-12 animate-expand' style={{ backgroundImage: 'linear-gradient(to right, #B88712, #D4A017)' }}></div>
                </div>

                {/* Main About Section */}
                <div className='mb-24 animate-slide-up'>
                    <p className='text-20px md:text-2xl leading-relaxed mb-8 text-center font-light animate-text-fade m-20' style={{ animationDelay: '1s' }}>
                        Sewana Homes (Private) Limited is a Sri Lankan real estate and housing development company established on February 07, 2022, with a clear purpose – to create comfortable, affordable and high-quality homes for modern Sri Lankan families.
                    </p>
                    
                    <p className='text-20px md:text-2xl leading-relaxed mb-8 text-center font-light animate-text-fade m-20' style={{ animationDelay: '1.5s' }}>
                        At Sewana Homes, we believe that owning a home should not be complicated or stressful. Our team is committed to developing well-planned housing projects that combine quality construction, smart designs and peaceful living environments. Every project we undertake is carefully selected and developed to ensure long-term value, safety and comfort for our customers.
                    </p>
                    
                    <p className='text-20px md:text-2xl leading-relaxed mb-8 text-center font-light animate-text-fade m-20' style={{ animationDelay: '2s' }}>
                        We focus on building homes in convenient locations with easy access to main roads, schools, hospitals and essential services, while maintaining calm and green surroundings. Our goal is not just to sell lands and houses, but to create communities where families can grow, feel secure and live happily.
                    </p>
                    
                    <p className='text-20px md:text-2xl leading-relaxed text-center font-light animate-text-fade m-20' style={{ animationDelay: '2.5s' }}>
                        With transparency, honesty and customer satisfaction at the heart of everything we do, Sewana Homes continues to grow as a trusted name in Sri Lanka's housing development industry.
                    </p>
                </div>

                {/* Divider */}
                <div className='flex justify-center mb-24 animate-scale-in' style={{ animationDelay: '0.5s' }}>
                    <div className='text-5xl animate-pulse' style={{ color: '#B88712' }}>⸻</div>
                </div>

                {/* Vision Section */}
                <div className='mb-24 animate-slide-up m-20' style={{ animationDelay: '0.6s' }}>
                    <h3 className='text-3xl md:text-5xl font-bold mb-8 text-center animate-glow' style={{ color: '#B88712' }}>Our Vision</h3>
                    <div className='bg-black/10 p-10 rounded-2xl  shadow-lg hover:shadow-2xl transition-all duration-300 animate-float' style={{ borderLeftColor: 'rgba(184, 135, 18, 0.05)', backgroundColor: 'rgba(184, 135, 18, 0.05)' }}>
                        <p className='text-20px md:text-2xl leading-relaxed font-light text-center'>
                            To become a leading and most trusted housing developer in Sri Lanka by creating sustainable, affordable and high-quality living communities that enhance the lifestyle of every family we serve.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className='flex justify-center mb-24 animate-scale-in' style={{ animationDelay: '0.7s' }}>
                    <div className='text-5xl animate-pulse' style={{ color: '#B88712' }}>⸻</div>
                </div>

                {/* Mission Section */}
                <div className='animate-slide-up m-20' style={{ animationDelay: '0.8s' }}>
                    <h3 className='text-3xl md:text-5xl font-bold mb-10 text-center animate-glow' style={{ animationDelay: '0.8s', color: '#B88712' }}>Our Mission</h3>
                    <div className='p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300' style={{ backgroundColor: 'rgba(184, 135, 18, 0.05)' }}>
                        <ul className='space-y-6'>
                            <li className='flex items-start gap-6 animate-slide-right card-hover' style={{ animationDelay: '0.9s' }}>
                                <span className='text-3xl font-bold flex items-center justify-center' style={{ color: '#B88712' }}>•</span>
                                <span className='text-20px md:text-xl leading-relaxed font-light'>To develop well-planned housing projects that offer comfort, safety and long-term value.</span>
                            </li>
                            <li className='flex items-start gap-6 animate-slide-right card-hover' style={{ animationDelay: '1s' }}>
                                <span className='text-3xl font-bold flex items-center justify-center' style={{ color: '#B88712' }}>•</span>
                                <span className='text-20px md:text-xl leading-relaxed font-light'>To provide honest, transparent and customer-friendly real estate services.</span>
                            </li>
                            <li className='flex items-start gap-6 animate-slide-right card-hover' style={{ animationDelay: '1.1s' }}>
                                <span className='text-3xl font-bold flex items-center justify-center' style={{ color: '#B88712' }}>•</span>
                                <span className='text-20px md:text-xl leading-relaxed font-light'>To use quality materials and modern construction practices in every project.</span>
                            </li>
                            <li className='flex items-start gap-6 animate-slide-right card-hover' style={{ animationDelay: '1.2s' }}>
                                <span className='text-3xl font-bold flex items-center justify-center' style={{ color: '#B88712' }}>•</span>
                                <span className='text-20px md:text-xl leading-relaxed font-light'>To make home ownership simple, affordable and accessible for Sri Lankan families.</span>
                            </li>
                            <li className='flex items-start gap-6 animate-slide-right card-hover' style={{ animationDelay: '1.3s' }}>
                                <span className='text-3xl font-bold flex items-center justify-center' style={{ color: '#B88712' }}>•</span>
                                <span className='text-20px md:text-xl leading-relaxed font-light'>To build lasting relationships with customers through trust, care and reliability.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
                /* Fade In Animation */
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                /* Slide Up Animation */
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Slide Right Animation */
                @keyframes slide-right {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Bounce In Animation */
                @keyframes bounce-in {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                /* Expand Animation */
                @keyframes expand {
                    from {
                        width: 0;
                    }
                    to {
                        width: 128px;
                    }
                }

                /* Scale In Animation */
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                /* Glow Animation */
                @keyframes glow {
                    0%, 100% {
                        text-shadow: 0 0 10px rgba(184, 135, 18, 0.5);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(184, 135, 18, 0.8);
                    }
                }

                /* Float Animation */
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                /* Bounce Dot Animation */
                @keyframes bounce-dot {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                /* Text Fade Animation */
                @keyframes text-fade {
                    from {
                        opacity: 0;
                        color: rgba(184, 135, 18, 0.5);
                    }
                    to {
                        opacity: 1;
                        color: inherit;
                    }
                }

                /* Shimmer Animation */
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }

                /* Pulse Grow Animation */
                @keyframes pulse-grow {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }

                /* Rotate In Animation */
                @keyframes rotate-in {
                    from {
                        opacity: 0;
                        transform: rotateY(-90deg) translateZ(0);
                    }
                    to {
                        opacity: 1;
                        transform: rotateY(0) translateZ(0);
                    }
                }

                /* Wave Animation */
                @keyframes wave {
                    0% {
                        transform: translateY(0px);
                    }
                    25% {
                        transform: translateY(-10px);
                    }
                    50% {
                        transform: translateY(0px);
                    }
                    75% {
                        transform: translateY(-5px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }

                /* Blur In Animation */
                @keyframes blur-in {
                    from {
                        opacity: 0;
                        filter: blur(10px);
                    }
                    to {
                        opacity: 1;
                        filter: blur(0);
                    }
                }

                /* Slide In From Left */
                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Slide In From Right */
                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Gradient Animation */
                @keyframes gradient-shift {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                /* Classes */
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-slide-right {
                    animation: slide-right 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-bounce-in {
                    animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }

                .animate-expand {
                    animation: expand 0.8s ease-out forwards;
                }

                .animate-scale-in {
                    animation: scale-in 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-bounce-dot {
                    animation: bounce-dot 0.6s ease-in-out infinite;
                }

                .animate-text-fade {
                    animation: text-fade 1s ease-out forwards;
                    opacity: 0;
                }

                .animate-shimmer {
                    animation: shimmer 3s infinite;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                    background-size: 1000px 100%;
                }

                .animate-pulse-grow {
                    animation: pulse-grow 2s ease-in-out infinite;
                }

                .animate-rotate-in {
                    animation: rotate-in 0.8s ease-out;
                    perspective: 1000px;
                }

                .animate-wave {
                    animation: wave 2s ease-in-out infinite;
                }

                .animate-blur-in {
                    animation: blur-in 0.8s ease-out;
                }

                .animate-slide-in-left {
                    animation: slide-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .animate-slide-in-right {
                    animation: slide-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .animate-gradient-shift {
                    animation: gradient-shift 3s ease infinite;
                    background-size: 200% 200%;
                }

                /* Professional Hover Effects */
                .card-hover {
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .card-hover:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(184, 135, 18, 0.2);
                }

                /* Smooth Transitions */
                * {
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    )
}

export default Blog
