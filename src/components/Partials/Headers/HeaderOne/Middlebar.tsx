import { useContext } from 'react';
import { AppContext } from '../../../../context/appcontext';
import Cart from '../../../Cart';
import Compair from '../../../Helpers/icons/Compair';
import ThinBag from '../../../Helpers/icons/ThinBag';
import ThinLove from '../../../Helpers/icons/ThinLove';
import ThinPeople from '../../../Helpers/icons/ThinPeople';
import SearchBox from '../../../Helpers/SearchBox';

export interface IMiddlebar {
  [x: string]: any;
}

export default function Middlebar({ className }: IMiddlebar) {
  // const [toggleCart, setToggle] = useState(false);
  // const cartHandler = () => {
  //   setToggle(!toggleCart);
  // };
  const { isLoggedIn, cart, wishlist } = useContext(AppContext);

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <a href="/">
                <img
                  width="152"
                  height="36"
                  src={`${process.env.PUBLIC_URL}/assets/images/sonik-logo.jpeg`}
                  alt="logo"
                />
              </a>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="compaire relative">
                <a href="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </a>
                {/* <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                  2
                </span> */}
              </div>
              {isLoggedIn ? (
                <div className="favorite relative">
                  <a href="/wishlist">
                    <span>
                      <ThinLove />
                    </span>
                  </a>
                  {wishlist.length ? (
                    <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                      {wishlist.length}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                ''
              )}
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <a href="/cart">
                    <span>
                      <ThinBag />
                    </span>
                  </a>
                  <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                    {cart.length}
                  </span>
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
              </div>
              <div>
                <button type="button">
                  <a href={isLoggedIn ? '/profile' : '/login'}>
                    <span>
                      <ThinPeople />
                    </span>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
