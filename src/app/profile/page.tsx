import ProfileNormalDetails from '@/compoments/ProfileNormalDetails';

export default function Profile(){
    return(
        <div className='container mx-auto'>
            <h1 className='text-[24px] text-center font-bold mt-5'>
                User Profile

            </h1>

            <div className="flex gap-8 mt-5 text-[20px] cursor-pointer">
                <h2 className=' primary underline'>Basic Details</h2>
                <h2 className=' '>Shipping Details</h2>
                <h2 className=' '>Track My Order</h2>



            </div>


            <div className='mt-5'>
                <ProfileNormalDetails></ProfileNormalDetails>
            </div>
            

        

        </div>
    )

}