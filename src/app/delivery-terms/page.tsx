export default function PrivacyPolicy() {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Privacy Policy - IYMART</h1>
 <section className='flex md:flex-row flex-col gap-20'>
 <div className="space-y-8">
  <div>
    <h2 className="text-lg font-semibold text-black">Free <span className="font-bold">shipping</span> Service:</h2>
    <ol className="list-decimal list-inside text-gray-800 mt-2 space-y-1">
      <li>
        All states <span className="font-semibold">except Free Shipping</span>.
      </li>
      <li>
        <span className="font-semibold text-red-600">Okinawa</span> not eligible for free shipping
      </li>
    </ol>

    <h3 className="mt-4 font-semibold text-gray-800">Free shipping Amount and KG</h3>
    <ol className="list-decimal list-inside text-gray-800 mt-2 space-y-1">
      <li>
        ¥15000 &gt; Maximum up to 20kg cart weight One Box Free shipping
      </li>
    </ol>
  </div>

  <div>
    <h2 className="text-lg font-semibold text-black">送料無料サービス：</h2>
    <ol className="list-decimal list-inside text-gray-800 mt-2 space-y-1">
      <li>
        九州地区、沖縄、北海道は送料無料対象外となります
      </li>
    </ol>

    <h3 className="mt-4 font-semibold text-gray-800">送料無料の金額とKG</h3>
    <ol className="list-decimal list-inside text-gray-800 mt-2 space-y-1">
      <li>
        15000 &gt; カート重量最大 20kg 1箱送料無料
      </li>
    </ol>
  </div>
</div>

    <div className="md:mx-10">
        <img src="/deliver=terms.jpg"></img>
    </div>
    </section> 
      </div>
    );
  }
  