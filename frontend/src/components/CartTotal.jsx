import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const CartTotal = () => {
    const { navigate, currency, method, setMethod, user,
        delivery_charges, getCartCount, getCartAmount, cartItems, setCartItems, products, axios, getToken } = useAppContext()

    const [addresses, setAddresses] = useState([])
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentProofFile, setPaymentProofFile] = useState(null)
    const [placing, setPlacing] = useState(false)


    const getAddress = async () => {
        try {
            const { data } = await axios.get('/api/addresses', {
                headers: { Authorization: `Bearer ${await getToken()}` },
            });

            if (data.success) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const placeOrder = async () => {
        try {
            setPlacing(true)
            if (!selectedAddress) {
                setPlacing(false)
                return toast.error("Please select an address")
            }
            let orderItems = []
            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === itemId))
                        if (itemInfo) {
                            itemInfo.size = size;
                            itemInfo.quantity = cartItems[itemId][size]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            // conver orderItems to items array for backend
            let items = orderItems.map(item => ({
                product: item._id,
                quantity: item.quantity,
                size: item.size,
            }))

            // place order Using BT (Bank Transfer) with optional payment proof
            if (method === "BT") {
                if (!paymentProofFile) {
                    setPlacing(false)
                    toast.error('Please upload bank transfer proof before proceeding')
                    return
                }
                const formData = new FormData()
                formData.append('items', JSON.stringify(items))
                formData.append('address', selectedAddress._id)
                if (paymentProofFile) formData.append('paymentProof', paymentProofFile)

                const { data } = await axios.post('/api/orders/cod', formData, {
                    headers: { Authorization: `Bearer ${await getToken()}`, 'Content-Type': 'multipart/form-data' },
                });

                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/my-orders');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post('/api/orders/stripe', {
                    items, address: selectedAddress._id
                }, {
                    headers: { Authorization: `Bearer ${await getToken()}` },
                });
                if (data.success) {
                    window.location.replace(data.url)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setPlacing(false)
        }
    }


    useEffect(() => {
        if (user) {
            getAddress()
        }
    }, [user])


    return (
        <div>
            <h3 className='bold-22'>Order Details <span className='bold-14 text-secondary'>({getCartCount()}) Items</span></h3>
            <hr className='border-gray-300 my-5' />
            {/* payment & addresses */}
            <div className='mb-5'>
                <div className='my-5'>
                    <h4 className='h4 mb-5'>Where to ship your order?</h4>
                    <div className='relative flex justify-between items-start mt-2'>
                        <p>{selectedAddress
                            ? `${selectedAddress.street}, ${selectedAddress.city}`
                            : "No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className='text-secondary medium-14 hover:underline cursor-pointer'>Change</button>
                        {showAddress && (
                            <div className='absolute top-10 py-1 bg-white ring-1 ring-slate-9010 text-sm w-full'>
                                {addresses.map((address, index) => (
                                    <p key={index} onClick={() => { setSelectedAddress(address); setShowAddress(false) }} className='p-2 cursor-pointer hover:bg-gray-100 medium-14'>
                                        {address.street}, {address.city}
                                    </p>
                                ))}
                                <p onClick={() => { navigate('/address-form'); scrollTo(0, 0) }} className='p-2 text-center cursor-pointer hover:bg-tertiary hover:text-white'>Add Address</p>
                            </div>
                        )}
                    </div>
                </div>
                <hr className='border-gray-300 mt-5' />
                <div className='my-6'>
                    <h4 className='h4 mb-5'>Payment Method</h4>
                    <div className='flex gap-3'>
                        <div onClick={() => setMethod("BT")} className={`${method === "BT" ? "btn-secondary" : "btn-outline"
                            } !py-1 text-xs cursor-pointer`}>
                            Bank Transfer
                        </div>
                        {/* <div onClick={() => setMethod("stripe")} className={`${method === "stripe" ? "btn-secondary" : "btn-outline"
                            } !py-1 text-xs cursor-pointer`}>
                            Stripe
                        </div> */}
                    </div>
                </div>
                {method === 'BT' && (
                    <div className='mt-3'>
                        <label className='block mb-2 font-medium'>Upload Bank Transfer Proof</label>
                        <input  className='text-red-500 cursor-pointer' required type='file' accept='image/*' onChange={(e) => setPaymentProofFile(e.target.files[0])} />
                    </div>
                )}
                <hr className="border-gray-300 mt-5" />
            </div>
            <div className='mt-4 space-y-2'>
                <div className='flex justify-between'>
                    <h5 className='h5'>Price</h5>
                    <p className='font-bold'>{currency}{getCartAmount()}</p>
                </div>
                {/* Shipping fee removed per request */}
                <div className='flex justify-between text-lg font-medium mt-3'>
                    <h4 className='h4'>Total Amount:</h4>
                    <p className='bold-18'>{currency}{getCartAmount() === 0 ? "0.00" : getCartAmount()}</p>
                </div>
                <button onClick={placeOrder} disabled={placing} aria-busy={placing} className={`btn-dark w-full mt-8 !rounded-md ${placing ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {placing ? (
                        <span className='flex items-center justify-center gap-2'>
                            <svg className='w-4 h-4 animate-spin' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className='opacity-75' fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        'Proceed to Order'
                    )}
                </button>
            </div>
        </div>
    )
}

export default CartTotal
