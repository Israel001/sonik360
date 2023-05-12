import { Link } from 'react-router-dom';
import Arrow from '../../../Helpers/icons/Arrow';
import Selectbox from '../../../Helpers/Selectbox';
import { useAppContext } from '../../../../context/appcontext';

export interface ITopBar {
  [x: string]: any;
}

export default function TopBar({ className }: ITopBar) {
  const { isLoggedIn } = useAppContext();

  return (
    <>
      <div
        className={`w-full bg-white h-10 border-b border-qgray-border ${
          className || ''
        }`}
      >
        <div className="container-x mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="topbar-nav">
              <ul className="flex space-x-6">
                <li>
                  <Link to={isLoggedIn ? '/profile' : '/login'}>
                    <span className="text-xs leading-6 text-qblack font-500">
                      Account
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/tracking-order">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Track Order
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Support
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="topbar-dropdowns sm:block hidden">
              <div className="flex space-x-6">
                <div
                  className="country-select flex space-x-1 items-center"
                  style={{ fontSize: '14px' }}
                >
                  <div style={{ marginRight: '.5rem' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/nigeria-flag.webp`}
                      width="16"
                      height="16"
                      alt="country logo"
                      className="overflow-hidden rounded-full"
                      style={{ height: '16px' }}
                    />
                  </div>
                  Nigeria
                </div>
                <div
                  className="currency-select flex space-x-1 items-center"
                  style={{ fontSize: '14px' }}
                >
                  NGN
                </div>
                <div
                  className="language-select flex space-x-1 items-center"
                  style={{ fontSize: '14px' }}
                >
                  English
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
