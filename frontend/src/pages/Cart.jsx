import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/data'

const Cart = () => {
    const { navigate, products, currency, cartItems, updateQuantity } = useAppContext()
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const tempData = []
            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        tempData.push({
                            _id: itemId,
                            size: size
                        })
                    }
                }
            }
            setCartData(tempData)
        }
    }, [products, cartItems])

    const increment = (id, size) => {
        const currentQuantity = cartItems[id][size]
        updateQuantity(id, size, currentQuantity + 1)
    }

    const decrement = (id, size) => {
        const currentQuantity = cartItems[id][size]
        if (currentQuantity > 1) {
            updateQuantity(id, size, currentQuantity - 1)
        }
    }

    return products && cartItems ? (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 pt-48'>
            <div className='max-padd-container'>
                <div className='flex flex-col xl:flex-row gap-12 xl:gap-16'>
                    {/* left side */}
                    <div className='flex flex-[2] flex-col gap-8'>
                        <Title title1={"Your"} title2={"Shopping Cart"} titleStyles={"pb-2"} />

                        {/* Bank Details Card */}
                        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                                    <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'/>
                                    </svg>
                                </div>
                                <h3 className='text-lg font-semibold text-blue-900'>Bank Transfer Details</h3>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>
                                <div className='bg-white/70 rounded-lg p-3'>
                                    <span className='font-medium text-gray-600'>Account Name:</span>
                                    <p className='font-semibold text-gray-900'>P L SENANAYAKE</p>
                                </div>
                                <div className='bg-white/70 rounded-lg p-3'>
                                    <span className='font-medium text-gray-600'>Account Number:</span>
                                    <p className='font-semibold text-gray-900'>80840165</p>
                                </div>
                                <div className='bg-white/70 rounded-lg p-3'>
                                    <span className='font-medium text-gray-600'>Bank:</span>
                                    <p className='font-semibold text-gray-900'>BOC</p>
                                </div>
                                <div className='bg-white/70 rounded-lg p-3'>
                                    <span className='font-medium text-gray-600'>Branch:</span>
                                    <p className='font-semibold text-gray-900'>Hakmana</p>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items Header */}
                        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                            <div className='grid grid-cols-[4fr_2fr_1fr] font-semibold text-gray-700 mb-6'>
                                <h5 className='text-left'>Product Details</h5>
                                <h5 className='text-center'>Subtotal</h5>
                                <h5 className='text-center'>Action</h5>
                            </div>

                            {/* Cart Items */}
                            <div className='space-y-4'>
                                {cartData.map((item, i) => {
                                    const product = products.find((product) => product._id === item._id)
                                    const quantity = cartItems[item._id][item.size]
                                    return (
                                        <div key={i} className='group grid grid-cols-[4fr_2fr_1fr] items-center bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30'>
                                            <div className='flex items-center gap-4'>
                                                <div className='relative'>
                                                    <div className='w-20 h-20 bg-gradient-to-br from-white to-indigo-100 rounded-xl flex items-center justify-center overflow-hidden shadow-sm'>
                                                        <img src={product.images[0]} alt="" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
                                                    </div>
                                                </div>
                                                <div className='flex-1'>
                                                    <h5 className='font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors'>{product.title}</h5>
                                                    <div className='flex items-center gap-2 text-sm text-gray-600 mb-2'>
                                                        <span className='font-medium'>Size:</span>
                                                        <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-medium'>{item.size}</span>
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='text-sm font-medium text-gray-600'>Quantity:</span>
                                                        <div className='flex items-center bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm'>
                                                            <button 
                                                                onClick={() => decrement(item._id, item.size)}
                                                                className='w-8 h-8 flex items-center justify-center rounded-full  text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors'
                                                            >
                                                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
                                                                </svg>
                                                            </button>
                                                            <span className='px-3 py-1 font-semibold text-gray-900 min-w-[40px] text-center'>{quantity}</span>
                                                            <button
                                                                onClick={() => increment(item._id, item.size)}
                                                                className='w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-green-50 hover:text-green-500 transition-colors'
                                                            >
                                                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-center'>
                                                <span className='text-lg font-bold text-gray-900'>{currency}{(product.price[item.size] * quantity).toFixed(2)}</span>
                                            </div>
                                            <div className='text-center mx-10 flex'>
                                                <button
                                                    onClick={()=> updateQuantity(item._id, item.size, 0)}
                                                    className='w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors group'
                                                >
                                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className='flex flex-1 flex-col'>
                        <div className='sticky top-24'>
                            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
                                <CartTotal />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default Cart
