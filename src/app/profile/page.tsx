'use client'
import { useState,useEffect } from 'react';
import ProfileNormalDetails from '@/compoments/ProfileNormalDetails';
import OrderTracking from '@/compoments/OrderTracking';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('basicDetails');
    const [orders, setOrders] = useState([]);
    const userId=JSON.parse(localStorage.getItem('user') || '{}').id;

    const fetchOrders = async () => {
        try {
            const response = await fetch(`https://iymart.jp/api/v1/orders?userId=${userId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                }
            }); // Adjust the API endpoint as needed
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOrders(data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);



    // Sample data for testing OrderTracking
    const sampleOrders = [
        {
            id: 1,
            order_number: "IY-123456",
            order_status: "pending",
            total: 5000,
            currency: "JPY",
            payment_status: "initiated",
            order_items: [
                { product_name: "Product A", unit_quantity: 2, line_total: 2000 },
                { product_name: "Product B", unit_quantity: 1, line_total: 3000 },
            ],
        },
        {
            id: 2,
            order_number: "IY-654321",
            order_status: "completed",
            total: 7500,
            currency: "JPY",
            payment_status: "paid",
            order_items: [
                { product_name: "Product C", unit_quantity: 3, line_total: 4500 },
                { product_name: "Product D", unit_quantity: 1, line_total: 3000 },
            ],
        },
    ];

    return (
        <div className="container mx-auto max-w-6xl p-6 rounded-[8px] ">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                User Profile
            </h1>

            {/* Tabs Section */}
            <div className="flex justify-center gap-8 mb-6">
                <h2
                    className={`cursor-pointer text-lg font-medium px-4 py-2 rounded-[8px] ${
                        activeTab === 'basicDetails'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab('basicDetails')}
                >
                    Basic Details
                </h2>
                <h2
                    className={`cursor-pointer text-lg font-medium px-4 py-2 rounded-[8px] ${
                        activeTab === 'shippingDetails'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab('shippingDetails')}
                >
                    Shipping Details
                </h2>
                <h2
                    className={`cursor-pointer text-lg font-medium px-4 py-2 rounded-[8px] ${
                        activeTab === 'trackOrder'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab('trackOrder')}
                >
                    Track My Order
                </h2>
            </div>

            {/* Content Section */}
            <div className="mt-5 p-6 bg-white rounded-[8px]">
                {activeTab === 'basicDetails' && (
                    <div className="animate-fadeIn">
                        <ProfileNormalDetails />
                    </div>
                )}
                {activeTab === 'trackOrder' && (
                    <div className="animate-fadeIn">
                        <OrderTracking orders={orders} />
                    </div>
                )}
                {activeTab === 'shippingDetails' && (
                    <div className="animate-fadeIn">
                        <p className="text-gray-600 text-center">
                            Shipping details will be displayed here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}