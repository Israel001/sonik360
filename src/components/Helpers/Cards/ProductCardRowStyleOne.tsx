import { ToastContainer, toast } from 'react-toastify';
import { LOCAL_STORAGE_KEYS, useAppContext } from '../../../context/appcontext';
import Compair from '../icons/Compair';
import QuickViewIco from '../icons/QuickViewIco';
import Star from '../icons/Star';
import ThinLove from '../icons/ThinLove';
import Heart from '../icons/Heart';
import { IProduct } from '../SearchBox';

export interface IProductCardRowStyleTwo {
  [x: string]: any;
  datas: IProduct;
}

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default function ProductCardRowStyleTwo({
  className,
  datas,
}: IProductCardRowStyleTwo) {
  const { cart, setCart, wishlist, setWishlist, isLoggedIn } = useAppContext();

  return (
    <div
      data-aos="fade-left"
      className={`product-row-card-style-one w-full h-[250px] bg-white group relative overflow-hidden ${
        className || ''
      }`}
      onClick={(event) => {
        location.href = `/products/${datas.slug}`;
      }}
    >
      <div className="flex space-x-5 items-center w-full h-full lg:p-[30px] sm:p-5 p-2">
        <div className="lg:w-1/2 w-1/3 h-full">
          <img
            src={`${baseUrl}/${datas.image.split(',')[0]}`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center h-full">
          <div>
            {/* reviews */}
            <div className="flex space-x-1 mb-3">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
              {datas.name}
            </p>
            <p className="price mb-[26px]">
              <span className="main-price font-600 text-[18px]">
                ₦ {datas.price}
              </span>
              {/* <span className="offer-price text-qred font-600 sm:text-[18px] text-base ml-2">
                  {datas.offer_price}
                </span> */}
            </p>
            <button
              type="button"
              className="w-[110px] h-[30px] bg-blue-500 text-white"
              onClick={(event) => {
                event.stopPropagation();
                const clonedCart = [...cart];
                const itemInCart = clonedCart.find((c) => c.id === datas.slug);
                if (itemInCart) {
                  if (itemInCart.quantity + 1 > datas.availability) {
                    toast.error(
                      `Only ${
                        datas.availability - itemInCart.quantity
                      } left in stock`,
                    );
                    return;
                  }
                  itemInCart.quantity += 1;
                } else {
                  if (!datas.availability) {
                    toast.error(`Item is out of stock`);
                    return;
                  }
                  clonedCart.push({
                    image: `${baseUrl}/${datas.image.split(',')[0]}`,
                    productName: datas.name,
                    price: datas.price,
                    quantity: 1,
                    color: datas.colors.split(',')[0],
                    id: datas.slug,
                    inStock: datas.availability,
                    attributes: datas.attributes
                  });
                }
                setCart(clonedCart);
                localStorage.setItem(
                  LOCAL_STORAGE_KEYS.CART,
                  JSON.stringify(clonedCart),
                );
                toast.success('Item added to cart successfully!', {
                  toastId: 'add-item-to-cart',
                });
              }}
            >
              <span className="yellow-btn "> Add To Cart</span>
            </button>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[30px]  transition-all duration-300 ease-in-out">
        <a>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <QuickViewIco />
          </span>
        </a>
        {isLoggedIn && (
          <a
            onClick={() => {
              const clonedWishlist = [...wishlist];
              const itemInWishlist = clonedWishlist.findIndex(
                (w) => w.id === 1,
              );
              let itemRemoved = false;
              if (itemInWishlist !== -1) {
                itemRemoved = true;
                clonedWishlist.splice(itemInWishlist, 1);
              } else {
                clonedWishlist.push({
                  image: `assets/images/product-img-1.jpg`,
                  productName: 'xoggle',
                  price: 27,
                  quantity: 1,
                  color: '',
                  id: 1,
                });
              }
              setWishlist(clonedWishlist);
              localStorage.setItem(
                LOCAL_STORAGE_KEYS.WISHLIST,
                JSON.stringify(clonedWishlist),
              );
              itemRemoved
                ? toast('Item removed from wishlist successfully')
                : toast('Item added to wishlist successfully');
            }}
            style={{ cursor: 'pointer' }}
          >
            <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
              {wishlist.find((w) => w.id === 1) ? <Heart /> : <ThinLove />}
            </span>
          </a>
        )}
        <a>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <Compair />
          </span>
        </a>
      </div>
    </div>
  );
}
