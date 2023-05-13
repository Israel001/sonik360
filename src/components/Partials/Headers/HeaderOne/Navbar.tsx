import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../../../Helpers/icons/Arrow';
import { ICategory } from '../../../AllProductPage/ProductsFilter';

export interface INavbar {
  [x: string]: any;
}

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default function Navbar({ className }: INavbar) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState('0px');
  const [mainCategories, setMainCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);
  // const getItems = document.querySelectorAll(`.categories-list li`).length;
  // if (categoryToggle && getItems > 0) {
  //   setSize(`${40 * getItems}px`);
  // }
  const handler = () => {
    setToggle(!categoryToggle);
  };

  const fetchMainCategories = async () => {
    const response = await fetch(`${baseUrl}/categories/main-categories`).then(
      (response) => response.json(),
    );
    setMainCategories(response);
  };

  const fetchSubCategories = async () => {
    const response = await fetch(`${baseUrl}/categories/sub-categories`).then(
      (response) => response.json(),
    );
    setSubCategories(response);
  };

  useEffect(() => {
    fetchMainCategories();
    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  return (
    <div
      className={`nav-widget-wrapper w-full bg-blue-500 rounded-b-3xl h-[60px] relative z-30  ${
        className || ''
      }`}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  {mainCategories.map((c) => {
                    return (
                      <li>
                        <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                          <span>{c.name}</span>
                          <span className="ml-1.5 ">
                            <Arrow className="fill-current" />
                          </span>
                        </span>
                        <div className="sub-menu w-full absolute left-0 top-[60px]">
                          <div
                            className="mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center "
                            style={{
                              minHeight: '295px',
                              boxShadow:
                                '0px 15px 50px 0px rgba(0, 0, 0, 0.14)',
                            }}
                          >
                            <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                              {subCategories
                                .filter((sc) => sc["__mainCategory__"]!.id === c.id)
                                .map((scc) => {
                                  return (
                                    <div>
                                      <div className="category">
                                        <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                          {scc.name}
                                        </h1>
                                      </div>
                                      <div className="category-items">
                                        <ul className="flex flex-col space-y-2">
                                          <li>
                                            <a href="/all-products">
                                              <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                                Shop Sidebar
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="/all-products">
                                              <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                                Shop Fullwidth
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="/all-products">
                                              <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                                Shop Category Icon
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="/all-products">
                                              <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                                Shop Category Icon
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="/all-products">
                                              <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                                Shop List View
                                              </span>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            {/* <div className="thumbnil w-[348px] h-full">
                            <div className="w-full h-[235px]">
                              <img
                                width=""
                                src={`${process.env.PUBLIC_URL}/assets/images/mega-menu-thumb.jpg`}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div> */}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  {/* <li className="relative">
                    <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                      <span>Pages</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: '0px 15px 50px 0px rgba(0, 0, 0, 0.14)',
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <a href="/privacy-policy">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      Privacy Policy
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/terms-condition">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      Terms and Conditions
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/faq">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      FAQ
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      Shop Category Icon
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      Shop List View
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  <li>
                    <Link to="/about">
                      <span className="flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>About</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs">
                      <span className="flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>Blog</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span className="flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>Contact</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="become-seller-btn">
              <Link to="/become-saller">
                <div className="black-btn w-[161px] h-[40px] flex justify-center items-center cursor-pointer">
                  <div className="flex space-x-2 items-center">
                    <span className="text-sm font-600">Become a Seller</span>
                    <span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.08984"
                          width="6.94106"
                          height="1.54246"
                          transform="rotate(45 1.08984 0)"
                          fill="white"
                        />
                        <rect
                          x="6"
                          y="4.9082"
                          width="6.94106"
                          height="1.54246"
                          transform="rotate(135 6 4.9082)"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
} 
