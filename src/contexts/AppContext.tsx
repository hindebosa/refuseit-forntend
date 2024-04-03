import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

import { toast } from 'react-toastify';
import { Product } from 'src/utils/types';

const apiUrl = process.env.REACT_APP_API_URL;

interface AppContextType {
    addProduct: (product: Product) => Promise<Product | null>;
    getProducts: () => Promise<Product[] | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useApp must be used within an AppProvider');
    }
    return context;
  };

export const AppProvider: React.FC = ({ children }) => {

    const addProduct = async (product: Product) => {
        try {
            const result = await axios.post(`${apiUrl}/products/createProducts`,{
                ...product
            })
            return result
        }
        catch (e) {
            return e
        }
    };

    const getProducts = async () => {
        try {
            const result = await axios.get(`${apiUrl}/products/allproducts`)
            return result.data.data
        }
        catch (e) {
            return e
        }
    }

    return (
        <AppContext.Provider value={{ getProducts, addProduct }}>
            {children}
        </AppContext.Provider>
    );
};
