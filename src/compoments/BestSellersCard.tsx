import kottuImage from '@public/kottu.svg'
import Image from 'next/image'

export default function BestSellersCard() {
    return (
        <div className="w-1/4">
            <Image src={kottuImage} alt='kottu-image' className='w-full'/>
            <h3 className='primary mx-5 text-[32px]'>Chill Rotti</h3>
            <p className='mt-3 mx-5 text-[#909090]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque  </p>
            <button className='px-6 py-3 mt-2 mx-5 border border-black'>Shop Now</button>
           
           
        </div>
    );
}
