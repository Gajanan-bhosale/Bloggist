import { Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <section
            style={{
                background: mode === 'dark'
                    ? 'linear-gradient(135deg, #1e293b, #334155)'
                    : 'linear-gradient(135deg, #fca61f, #f87171)',
                padding: '6rem 0',
            }}
            className="relative"
        >
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <main className="text-center">
                    <div className="mb-8">
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png"
                                alt="Bloggist Logo"
                                className="w-32 h-32 object-contain transform hover:rotate-12 transition-transform duration-300"
                            />
                        </div>

                        <h1 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-lg mb-4 animate-fade-in">
                            Bloggist
                        </h1>

                        <p
                            className="sm:text-2xl text-lg text-white opacity-90 leading-relaxed animate-fade-in"
                            style={{ color: mode === 'dark' ? '#cbd5e1' : '#ffffff' }}
                        >
                            Discover insightful blogs and tutorials contributed by Bloggist.
                        </p>

                        <div className="mt-8">
                            <button className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition-all">
                                Explore Blogs
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-in-out;
                }
            `}</style>
        </section>
    );
}

export default HeroSection;
