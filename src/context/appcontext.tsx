import { createContext, useContext, useEffect, useState } from 'react';
import { ICategory } from '../components/AllProductPage/ProductsFilter';

export interface IAppContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  cart: ICart[];
  setCart: (v: ICart[]) => void;
  wishlist: any[];
  setWishlist: (v: any[]) => void;
  user: IUser | undefined;
  setUser: (v: IUser | undefined) => void;
  categories: ICategory[];
  subCategories: ICategory[];
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  id: number;
}

export interface ICart {
  image: string;
  productName: string;
  price: number;
  quantity: number;
  color: string;
  id: string;
  inStock: number;
  attributes: any;
}

export enum LOCAL_STORAGE_KEYS {
  ACCESS_TOKEN = 'accessToken',
  CART = 'cart',
  WISHLIST = 'wishlist',
  USER = 'user',
  LAST_LOGGED_IN = 'lastLoggedIn',
}

const AppContext = createContext<IAppContext>({} as any);

const baseUrl = process.env.REACT_APP_SERVER_URL;

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<ICart[]>([]);
  const [wishlist, setWishlist] = useState<ICart[]>([]);
  const [user, setUser] = useState<IUser>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    const response = await fetch(`${baseUrl}/categories/main-categories`).then(
      (response) => response.json(),
    );
    setCategories(response);
  };

  const fetchSubCategories = async () => {
    const response = await fetch(`${baseUrl}/categories/sub-categories`).then(
      (response) => response.json(),
    );
    setSubCategories(response);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) setIsLoggedIn(true);
    const user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    setUser(user ? JSON.parse(user) : null);
    const cart = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    setCart(cart ? JSON.parse(cart) : []);
    const wishlist = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
    setWishlist(wishlist ? JSON.parse(wishlist) : []);

    const lastLoggedIn = parseInt(
      localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_LOGGED_IN)!,
    );
    if (new Date().getTime() - lastLoggedIn > 3000000) {
      // make a request to refresh the token
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LAST_LOGGED_IN);
      setIsLoggedIn(false);
    }

    fetchCategories();
    fetchSubCategories();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        cart,
        setCart,
        wishlist,
        setWishlist,
        user,
        setUser,
        categories,
        subCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { ContextProvider, useAppContext, AppContext };
