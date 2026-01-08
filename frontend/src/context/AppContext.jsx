import { useAuth, useUser } from '@clerk/clerk-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    // Clerk
    const { user } = useUser();
    const { getToken } = useAuth();

    // Get user profile
    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user', {
                headers: { Authorization: `Bearer ${await getToken()}` },
            });

            if (data.success) {
                setIsOwner(data.role === 'owner');
            } else {
                // Retry fetching user details after 5 seconds
                setTimeout(() => {
                    getUser();
                }, 5000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            getUser();
        }
    }, [user]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        navigate,
        user,
        products,
        fetchProducts,
        currency,
        searchQuery,
        setSearchQuery,
        isOwner,
        setIsOwner,
        axios,
        getToken,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
