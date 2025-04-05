import kottuImage from '@public/kottu.svg'
import Image from 'next/image'

interface BaseSelectPropsType {
    BestSellerProduct: {
        id: number;
        name: string;
        description: string;
        slug: string;
        price: string;
        discount?: number;
        imageUrl: string;
    };
}

export default function BestSellersCard({BestSellerProduct}:BaseSelectPropsType) {
    return (
        <div className="md:w-1/4 w-full flex flex-col md:justify-start justify-center md:gap-2 gap-1 md:shadow-none shadow-lg  md:h-[520px]">
            <Image src={kottuImage} alt='kottu-image' className='md:w-full w-[100%]'/>
            <h3 className='primary md:text-start text-center mx-5 md:text-[24px] text-[24px]'>{BestSellerProduct.name}</h3>
            <p className='mt-1 mx-5 md:text-start text-center text-[#909090] flex-grow text-[16px]'> 
                {BestSellerProduct.description.split(' ').slice(0, 10).join(' ')} 
            </p>
            <div className="flex-grow"></div> {/* Spacer to push the button to the bottom */}
            <a href={`shop/${BestSellerProduct.slug}`} className='align-bottom mb-2 md:mt-0 mt-1  md:text-start text-center'>
                <button className='px-6 py-3 mx-5 border border-black'>Shop Now</button>
            </a>
        </div>
    );
}
