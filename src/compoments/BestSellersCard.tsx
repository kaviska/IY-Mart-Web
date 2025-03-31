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
        <div className="w-1/4 flex flex-col gap-2  h-[550px]">
            <Image src={kottuImage} alt='kottu-image' className='w-full'/>
            <h3 className='primary mx-5 text-[28px]'>{BestSellerProduct.name}</h3>
            <p className='mt-1 mx-5 text-[#909090] flex-grow'> 
                {BestSellerProduct.description.split(' ').slice(0, 10).join(' ')} 
            </p>
            <div className="flex-grow"></div> {/* Spacer to push the button to the bottom */}
            <a href={`shop/${BestSellerProduct.slug}`} className='align-bottom mb-2'>
                <button className='px-6 py-3 mx-5 border border-black'>Shop Now</button>
            </a>
        </div>
    );
}
