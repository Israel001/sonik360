import { toast } from 'react-toastify';
import { LOCAL_STORAGE_KEYS, useAppContext } from '../../../context/appcontext';
import Compair from '../icons/Compair';
import Heart from '../icons/Heart';
import QuickViewIco from '../icons/QuickViewIco';
import ThinLove from '../icons/ThinLove';
import { IProduct } from '../SearchBox';

export interface IProductCardStyleOne {
  [x: string]: any;
  datas: IProduct;
}

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default function ProductCardStyleOne({ datas }: IProductCardStyleOne) {
  const { cart, setCart, wishlist, setWishlist, isLoggedIn } = useAppContext();

  return (
    <div
      className="product-card-one w-full h-full bg-white relative group overflow-hidden"
      style={{ boxShadow: '0px 15px 64px 0px rgba(0, 0, 0, 0.05)' }}
      onClick={(event) => {
        location.href = `/products/${datas.slug}`;
      }}
    >
      <div
        className="product-card-img w-full h-[300px]"
        style={{
          background: `url(${baseUrl}/${datas.image.split(',')[0]})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {/* product available progress */}
        {/* {datas.availability && (
          <>
            <div className="px-[30px] absolute left-0 top-3 w-full">
              <div className="progress-title flex justify-between ">
                <p className="text-xs text-qblack font-400 leading-6">
                  Products Available
                </p>
                <span className="text-sm text-qblack font-600 leading-6">
                  {datas.availability}
                </span>
              </div>
              <div className="progress w-full h-[5px] rounded-[22px] bg-primarygray relative overflow-hidden">
                <div
                  style={{
                    width: `${datas.availability ? 100 : 0}%`,
                  }}
                  className="h-full absolute left-0 top-0 bg-qyellow"
                ></div>
              </div>
            </div>
          </>
        )} */}
        {/* product type */}
        {/* {datas.product_type && !datas.campaingn_product && (
          <div className="product-type absolute right-[14px] top-[17px]">
            <span
              className={`text-[9px] font-700 leading-none py-[6px] px-3 uppercase text-white rounded-full tracking-wider ${
                datas.product_type === 'popular' ? 'bg-[#19CC40]' : 'bg-qyellow'
              }`}
            >
              {datas.product_type}
            </span>
          </div>
        )} */}
      </div>
      <div className="product-card-details px-[30px] pb-[30px] relative">
        {/* add to cart button */}
        <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[33px] transition-all duration-300 ease-in-out">
          <button
            type="button"
            className="yellow-btn"
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
            <div className="flex items-center space-x-3">
              <span>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                </svg>
              </span>
              <span>Add To Cart</span>
            </div>
          </button>
        </div>
        {/* <div className="reviews flex space-x-[1px] mb-3">
          {Array.from(Array(datas.review), () => (
            <span key={datas.review + Math.random()}>
              <Star />
            </span>
          ))}
        </div> */}
        <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
          {datas.name}
        </p>
        <p className="price">
          <span className="main-price font-600 text-[18px]">
            ₦ {datas.price}
          </span>
          {/* <span className="offer-price text-qred font-600 text-[18px] ml-2">
            {datas.offer_price}
          </span> */}
        </p>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20  transition-all duration-300 ease-in-out">
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
