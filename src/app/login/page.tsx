
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
export default function Login(){

    return(
        <div className='container md:mx-5 mr-2 md:mt-5 mt-3'>
            <div className="flex md:flex-row flex-col md:px-0 px-3 ">

                <div className="md:w-[50%]   login-background md:h-[95vh] h-[130vh] flex md:items-end md:justify-start justify-center md:px-10 px-5 pb-10 ">
                <h2 className="text-white md:text-[64px] text-[50px] font-medium md:leading-20 leading-16 md:text-start text-center"> Welcome <br /> Back</h2>
                  
                </div>
                <div className="md:w-[50%] md:px-16 px-5 md:pt-14 pt-5 md:mt-0 mt-[-600px] mx-5 md:mx-0 rounded-[8px] bg-white md:shadow-none shadow-lg ">
                    <div>
                        <h1 className='text-[40px] md:text-start text-center  font-medium'>Login</h1>
                        <p className="text-[16px]  md:text-start text-center secondary">Welcome Back! Please Login To Your Account,
                            <span className="md:inline hidden">Please Enter Your Valid Email & Password</span> </p>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="" className="font-normal">Email Address</label>
                        <input type="text" placeholder='Enter Your Email' className='border border-[#D9D9D9] rounded-[5px] w-full px-4 py-2 mt-2 mb-4'/>

                        <label htmlFor="" className="font-normal ">Email Address</label>
                        <input type="text" placeholder='Enter Your Email' className='border border-[#D9D9D9] rounded-[5px] w-full px-4 py-2 mt-2'/>
                    </div>

                    <div className="flex justify-between mt-5">
                        <div>
                        <FormControlLabel 
                            control={<Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} color="success" />} 
                            label={<span style={{ fontSize: '12px', color: '#4F4F4F' }}>Label</span>} 
                        />
                        </div>
                        <div>
                            <span className='text-[12px] text-[#4F4F4F] '>Frogot Password</span>
                        </div>




                    </div>

                    <div className="mt-5 ">
                        <button className="w-full rounded-[5px] bg-primary text-white py-2">Login</button>

                    </div>

                    <div className="mt-8 ">
                        <p className="text-[16px] text-[#4F4F4F]">Don&apos;t have an account? <span className='secondary'>Create an account</span></p>

                    </div>


                </div>

            </div>
        </div>
    )

}