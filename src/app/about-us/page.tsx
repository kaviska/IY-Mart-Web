export default function AboutUs() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-green-800 mb-6">About Us</h1>
            <p className="text-gray-700 mb-6">
                Welcome to <strong>IY Mart</strong>, your trusted Sri Lankan grocery store in Japan. We are proud to bring the authentic flavors of Sri Lanka to your doorstep, offering a wide range of high-quality grocery items that cater to the needs of Sri Lankan nationals, Japanese residents, and anyone who loves Sri Lankan cuisine.
            </p>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                <p className="text-gray-700">
                    At IY Mart, our mission is to provide the finest Sri Lankan products to our customers in Japan. We aim to bridge the gap between Sri Lanka and Japan by delivering authentic, fresh, and affordable grocery items that remind you of home.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>A wide selection of Sri Lankan spices, snacks, and condiments.</li>
                    <li>Fresh produce and specialty items sourced directly from Sri Lanka.</li>
                    <li>Convenient online shopping with fast delivery across Japan.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Why Choose Us?</h2>
                <p className="text-gray-700">
                    We are committed to quality, authenticity, and customer satisfaction. Our team works tirelessly to ensure that every product meets the highest standards, so you can enjoy the true taste of Sri Lanka without compromise.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Our Story</h2>
                <p className="text-gray-700">
                    Founded with a passion for Sri Lankan culture and cuisine, IY Mart started as a small initiative to serve the Sri Lankan community in Japan. Over the years, we have grown into a trusted name, connecting people with the flavors and traditions of Sri Lanka.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <p className="text-gray-700">
                    Have questions or need assistance? Feel free to reach out to us:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Email: <a href="mailto:info.iymart@gmail.com" className="text-green-700 underline">info.iymart@gmail.com</a></li>
                    <li>Phone: <a href="tel:+817042239811" className="text-green-700 underline">+81-704-223-9811</a></li>
                    <li>Address: 383-24 Oyaguchi, Matsudo, Chiba 270-0005, Japan</li>
                </ul>
            </section>
        </div>
    );
}