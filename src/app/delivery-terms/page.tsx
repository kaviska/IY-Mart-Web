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
    <div className="mt-10">
          <h2 className="text-lg font-semibold text-black mb-4">Our Location</h2>
          <div className="w-full h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5353644.198202348!2d135.502165!3d36.204824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e5b5e6a8f8f%3A0x7c8e2e0b0b0b0b0b!2sJapan!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
  