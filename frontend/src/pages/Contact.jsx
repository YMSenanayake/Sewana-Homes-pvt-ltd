import { assets } from '../assets/data'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!name || !email || !message) return toast.error('Please fill all fields')
        setLoading(true)
        try {
            // use VITE_BACKEND_URL when set, otherwise default to localhost during development
            const backendBase = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '') || (location.hostname === 'localhost' ? 'https://sewana-homes-pvt-ltd-backend.vercel.app/' : '')
            const url = backendBase ? `${backendBase}/api/contact` : '/api/contact'
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            })

            if (!res.ok) {
                // Try to read response text for better error visibility
                let text = ''
                try { text = await res.text() } catch (e) { /* ignore */ }
                console.error('Contact submit failed', res.status, text)
                toast.error(`Failed to send message (${res.status}): ${text || res.statusText}`)
            } else {
                // parse JSON when ok
                const data = await res.json()
                if (data.success) {
                    toast.success('Message sent — we will reply soon')
                    setName('')
                    setEmail('')
                    setMessage('')
                } else {
                    toast.error(data.message || 'Failed to send message')
                }
            }
        } catch (err) {
            toast.error(err.message || 'Network error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-primary py-48">
            <form onSubmit={submitHandler} className="flex flex-col items-center text-sm text-slate-800">
                <p className="text-xs bg-black/80 text-white     font-medium px-3 py-1 rounded-full">Contact Us</p>
                <h1 className="text-4xl font-bold py-4 text-center">Let’s Get In Touch.</h1>
                <p className="max-md:text-sm text-gray-500 pb-10 text-center">
                    Or just reach out to us on WhatsApp — send us a message anytime! Click Number:- <a href="https://wa.me/94718881197" className="text-indigo-600 hover:underline">0718881197</a>
                </p>

                <div className="max-w-96 w-full px-4">
                    <label htmlFor="name" className="font-medium">Full Name</label>
                    <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 bg-secondary/10 rounded-full focus-within:ring-2 focus-within:ring-indigo-600 transition-all overflow-hidden">
                        <img src={assets.user} alt="" width={19} className="invert-50" />
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your full name" required />
                    </div>

                    <label htmlFor="email-address" className="font-medium mt-4">Email Address</label>
                    <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 bg-secondary/10 rounded-full focus-within:ring-2 focus-within:ring-indigo-600 transition-all overflow-hidden">
                        <img src={assets.mail} alt="" width={18} className='invert-50'/>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your email address" required />
                    </div>

                    <label htmlFor="message" className="font-medium mt-4">Message</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="4" className="w-full mt-2 p-2  border border-slate-300 bg-secondary/10 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-600 transition-all" placeholder="Enter your message" required></textarea>

                    <button type="submit" disabled={loading} className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition">
                        {loading ? 'Sending...' : 'Submit Form'}
                        <img src={assets.right} alt="" className='invert'/>
                    </button>
                </div>
            </form>
        </div>
    );
};