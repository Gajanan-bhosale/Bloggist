import { Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <section
            className="relative py-24"
            style={{
                background: mode === 'dark' 
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(30, 41, 59, 0.7))' 
                    : 'linear-gradient(135deg, #fca61f, #ff7b0d)',
            }}>
            <div className="container mx-auto flex px-5 items-center justify-center flex-col text-center">
                
                <div className="mb-6">
                    <div className="flex justify-center mb-4">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png" 
                            alt="Logo"
                            className="w-20 h-20 transition-transform transform hover:scale-110" 
                        />
                    </div>
                    
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Bloggist
                    </h1>

                    <p 
                        style={{ color: 'white' }}
                        className="sm:text-3xl text-lg font-light mb-6">
                        Discover insightful blogs and tutorials contributed by the Bloggist community.
                    </p>
                </div>

                <button className="bg-white text-black py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">
                    Explore Blogs
                </button>
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500 opacity-50 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-600 opacity-50 rounded-full blur-xl"></div>
        </section>
    );
}

export default HeroSection;
