import { toast, ToastContainer } from 'react-toastify';
import { LOCAL_STORAGE_KEYS, useAppContext } from '../../context/appcontext';
import withLoginContext from '../../hoc/withLoginContext';
import BreadcrumbCom from '../BreadcrumbCom';
import EmptyWishlistError from '../EmptyWishlistError';
import PageTitle from '../Helpers/PageTitle';
import Layout from '../Partials/Layout';
import ProductsTable from './ProductsTable';

const Wishlist = () => {
  const { wishlist, setWishlist, cart, setCart } = useAppContext();

  return (
    <Layout childrenClasses={wishlist.length ? 'pt-0 pb-0' : ''}>
      {!wishlist.length ? (
        <div className="wishlist-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: 'home', path: '/' },
                { name: 'wishlist', path: '/wishlist' },
              ]}
            />
            <EmptyWishlistError />
          </div>
        </div>
      ) : (
        <div className="wishlist-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Wishlist"
              breadcrumb={[
                { name: 'home', path: '/' },
                { name: 'wishlist', path: '/wishlist' },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" />
              <div className="w-full mt-[30px] flex sm:justify-end justify-start">
                <div className="sm:flex sm:space-x-[30px] items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setWishlist([]);
                      localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify([]));
                    }}
                  >
                    <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                      Clean Wishlist
                    </div>
                  </button>
                  <div className="w-[180px] h-[50px]">
                    <button
                      type="button"
                      className="yellow-btn"
                      onClick={() => {
                        const clonedCart = [...cart];
                        for (const wish of wishlist) {
                          const itemInCart = clonedCart.find(
                            (c) => c.id === wish.id,
                          );
                          if (itemInCart) {
                            itemInCart.quantity += 1;
                          } else {
                            clonedCart.push(wish);
                          }
                        }
                        setCart(clonedCart);
                        setWishlist([]);
                        localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify([]));
                        localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(clonedCart));
                        toast.success('Items added to cart successfully!');
                      }}
                    >
                      <div className="w-full text-sm font-semibold">
                        Add all to cart
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default withLoginContext(Wishlist)
