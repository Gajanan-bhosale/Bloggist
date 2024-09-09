import { Typography } from '@material-tailwind/react'
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';

function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <section
            style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#fca61f' }}>

            
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                
                <main>
                    <div className="text-center">
                        <div className="mb-2">
                            
                            <div className="flex justify-center">
                                <img src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png" alt="" />
                            </div>

                            
                            <h1 className=' text-3xl text-white font-bold'>Bloggist</h1>
                        </div>

                        
                        <p
                            style={{ color: mode === 'dark' ? 'white' : 'white' }}
                            className="sm:text-3xl text-xl font-extralight sm:mx-auto ">
                            Here are some blogs and tutorials contributed by Devknus.
                        </p>
                    </div>

                </main>
            </div>
        </section>
    )
}

export default HeroSection