export default function ContactUs() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-green-800 mb-6">Contact Us - IYMART</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Our Contact Information</h2>
                <p className="text-gray-700">
                    We are here to assist you. Feel free to reach out to us using the following contact details:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                    <li>
                        <span className="font-semibold">Phone:</span>{" "}
                        <a href="tel:+817042239811" className="text-green-700 underline">+81-704-223-9811</a>
                    </li>
                    <li>
                        <span className="font-semibold">Email:</span>{" "}
                        <a href="mailto:info.iymart@gmail.com" className="text-green-700 underline">info.iymart@gmail.com</a>
                    </li>
                    <li>
                        <span className="font-semibold">Address:</span>{" "}
                        383-24 Oyaguchi, Matsudo, Chiba 270-0005, Japan
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
                <p className="text-gray-700">
                    If you have any questions, concerns, or feedback, please don&apos;t hesitate to contact us. We aim to respond to all inquiries promptly.
                </p>
            </section>
        </div>
    );
}