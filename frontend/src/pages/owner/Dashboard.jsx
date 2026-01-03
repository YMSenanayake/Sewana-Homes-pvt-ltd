import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/data'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user, currency, axios, getToken } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    orders: [],
    totalOrders: 0,
    totalRevenue: 0,
  })

  const getDashboardData = async () => {
    // Only show loading on initial fetch if data is empty, otherwise background refresh
    if(dashboardData.orders.length === 0) setIsLoading(true); 
    
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/orders/', { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;

    // 1. OPTIMISTIC UPDATE: Update UI immediately before server responds
    setDashboardData(prev => ({
      ...prev,
      orders: prev.orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    }));

    try {
      const token = await getToken();
      const { data } = await axios.post('/api/orders/status', 
        { orderId, status: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message)
        // Optional: You can re-fetch here to ensure sync, but optimistic update handles the visual
      } else {
        // If server failed, revert UI by fetching real data
        toast.error(data.message)
        await getDashboardData() 
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      await getDashboardData() // Revert UI on error
    }
  }

  const paymentStatusHandler = async (e, orderId) => {
    const newPaymentStatus = e.target.value === 'Paid';

    // OPTIMISTIC UPDATE: Update UI immediately before server responds
    setDashboardData(prev => ({
      ...prev,
      orders: prev.orders.map(order => 
        order._id === orderId ? { ...order, isPaid: newPaymentStatus } : order
      )
    }));

    try {
      const token = await getToken();
      const { data } = await axios.post('/api/orders/payment-status', 
        { orderId, isPaid: newPaymentStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
        await getDashboardData() 
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      await getDashboardData() // Revert UI on error
    }
  }

  useEffect(() => {
    if (user) {
      getDashboardData()
    }
  }, [user])

  if (isLoading) {
    return <div className='min-h-screen flexCenter'>Loading Dashboard...</div>
  }

  return (
    <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-primary shadow rounded-xl'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flexStart gap-7 p-5 bg-[#fff4d2] lg:min-w-56 rounded-xl'>
          <img src={assets.house} alt="" className='hidden sm:flex w-8' />
          <div>
            <h4 className='h4'>{(dashboardData?.totalOrders ?? 0).toString().padStart(2, "0")}</h4>
            <h5 className='h5 text-secondary'>Total Sales</h5>
          </div>
        </div>
        <div className='flexStart gap-7 p-5 bg-[#fff4d2] lg:min-w-56 rounded-xl'>
          <img src={assets.dollar} alt="" className='hidden sm:flex w-8' />
          <div>
            <h4 className='h4'>{currency} {dashboardData?.totalRevenue || 0}</h4>
            <h5 className='h5 text-secondary'>Total Earnings</h5>
          </div>
        </div>
      </div>

      {/* All orders/sales */}
      <div className='bg-primary mt-4'>
        {(dashboardData?.orders || []).map((order) => (
          <div key={order._id} className='bg-white p-3 mb-4 rounded-2xl'>
            {/* Products List */}
            { (order.items || []).map((item, idx) => {
              const product = item.product || {};
              const productImage = product.images?.[0] || '';
              const productTitle = product.title || 'Product';
              const productPrice = product.price ? (product.price[item.size] ?? 0) : 0;

              return (
                <div key={idx} className='text-gray-700 flex flex-col lg:flex-row gap-4 mb-3'>
                  <div className='flex flex-[2] gap-x-3'>
                    <div className='flexCenter bg-primary rounded-xl'>
                      <img src={productImage} alt="" className='max-h-20 max-w-20 object-contain' />
                    </div>
                    <div className="block w-full">
                      <h5 className="h5 uppercase line-clamp-1">{productTitle}</h5>
                      <div className='flex flex-wrap gap-3 max-sm:gap-y-1 mt-1'>
                        <div className='flex items-center gap-x-2'>
                          <h5>Price:</h5>
                          <p>{currency}{productPrice}</p>
                        </div>
                        <div className='flex items-center gap-x-2'>
                          <h5 className='medium-14'>Quantity:</h5>
                          <p>{item.quantity}</p>
                        </div>
                        <div className='flex items-center gap-x-2'>
                          <h5 className='medium-14'>Size:</h5>
                          <p>{item.size}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            
            {/* Order summary */}
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-300 pt-3'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Order Id:</h5>
                  <p className='text-gray-400 text-sm break-all'>{order._id}</p>
                </div>
                <div className='flex gap-4'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Customer:</h5>
                  <p className='text-gray-400 text-sm'>{order.address?.firstName || ''} {order.address?.lastName || ''}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Address:</h5>
                  <p className='text-gray-400 text-sm'>{order.address?.street || ''}, {order.address?.city || ''}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Phone:</h5>
                  <p className='text-gray-400 text-sm'>{order.address?.phone || ''}</p>
                </div>
                </div>                <div className="flex gap-4">
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Payment Method:</h5>
                  <p className='text-gray-400 text-sm'>
                    {order.paymentMethod
                      ? (order.paymentMethod === 'COD' ? 'Bank Transfer (COD)' : order.paymentMethod === 'stripe' ? 'Stripe' : order.paymentMethod)
                      : 'N/A'}
                  </p>
                </div>
                   <div className='flex items-center gap-x-2'>
                    <h5 className='medium-14'>Date:</h5>
                    <p className='text-gray-400 text-sm'>{order.createdAt ? new Date(order.createdAt).toDateString() : ''}</p>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <h5 className='medium-14'>Amount:</h5>
                    <p className='text-gray-400 text-sm'>{currency}{order.amount || 0}</p>
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <h5 className='medium-14'>Status:</h5>
                <select 
                  onChange={(e) => statusHandler(e, order._id)} 
                  value={order.status || ''}
                  className='text-sm font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary cursor-pointer outline-none focus:ring-secondary transition-all'
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div className='flex items-center gap-2'>
                <h5 className='medium-14'>Payment:</h5>
                <select 
                  onChange={(e) => paymentStatusHandler(e, order._id)} 
                  value={order.isPaid ? 'Paid' : 'Unpaid'}
                  className='text-sm font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-28 bg-primary cursor-pointer outline-none focus:ring-secondary transition-all'
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
            {order.paymentProof && order.paymentProof.url && (
              <div className='mt-3'>
                <h5 className='h5'>Payment Proof</h5>
                <img src={order.paymentProof.url} alt="payment proof" className='max-w-xs mt-2 rounded-lg shadow' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard