import { useEffect, useState } from 'react';
import 'react-input-range/lib/css/index.css';
import BreadcrumbCom from '../BreadcrumbCom';
import ProductCardStyleOne from '../Helpers/Cards/ProductCardStyleOne';
import Layout from '../Partials/Layout';
import ProductsFilter from './ProductsFilter';
import { IProduct } from '../Helpers/SearchBox';
import qs from 'query-string';

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default function AllProductPage() {
  const [filters, setFilter] = useState<any>({});
  const [displayFilters, setDisplayFilters] = useState(true);

  const checkboxHandler = (e: any) => {
    const { name } = e.target;
    setFilter((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [volume, setVolume] = useState({ min: 0, max: 800000 });
  const [maxPrice, setMaxPrice] = useState(1000);

  const [storage, setStorage] = useState(null);
  const filterStorage = (value: any) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);

  // const { products } = productDatas;
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async (filtersToUse: string, volume: any) => {
    const response = await fetch(
      `${baseUrl}/products?filter=${filtersToUse}&minPrice=${volume.min}&maxPrice=${volume.max}`,
    ).then((response) => response.json());
    setProducts(response);
  };

  const searchProduct = async (query: string) => {
    const response = await fetch(`${baseUrl}/products/search/${query}`).then(
      (response) => response.json(),
    );
    setProducts(response.data);
    setDisplayFilters(false);
  };

  const filterProduct = async (category: string, value: string) => {
    const response = await fetch(
      `${baseUrl}/products/${category}/${value}`,
    ).then((response) => response.json());
    setProducts(response);
    setDisplayFilters(false);
  };

  useEffect(() => {
    const parsed = qs.parse(location.search);
    let isAFilter = false;
    Object.entries(parsed).forEach(([k, v]) => {
      if (k.includes('[')) {
        const key = k.split('[');
        if (key[0] === 'filter') {
          isAFilter = true;
          filterProduct(key[1].substring(0, key[1].length - 1), v as any);
        }
      }
    });
    if (!isAFilter) {
      if (parsed.search) {
        searchProduct(parsed.search as string);
      } else {
        if (volume.min < 0) {
          setVolume({ min: 0, max: maxPrice });
        }
        const filtersToUse: string[] = [];
        Object.entries(filters).map(([k, v]) => {
          if (v) filtersToUse.push(k);
        });
        fetchProducts(filtersToUse.join(','), volume);
      }
    }
  }, [filters, volume]);

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div
                className="lg:w-[270px]"
                style={{ display: displayFilters ? 'block' : 'none' }}
              >
                <ProductsFilter
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
                  checkboxHandler={checkboxHandler}
                  volume={volume}
                  maxPrice={maxPrice}
                  volumeHandler={(value: any) => {
                    if (value.min < 0) value.min = 0;
                    setVolume(value);
                  }}
                  storage={storage}
                  filterstorage={filterStorage}
                  className="mb-[30px]"
                />
                {/* ads */}
                <div className="w-full hidden lg:block h-[295px]">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/ads-5.png`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-1">
                {/* <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Showing</span> 1–16 of 66
                      results
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="font-400 text-[13px]">Sort by:</span>
                    <div className="flex space-x-3 items-center border-b border-b-qgray">
                      <span className="font-400 text-[13px] text-qgray">
                        Default
                      </span>
                      <span>
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggle(!filterToggle)}
                    type="button"
                    className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div> */}
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                  {products.length
                    ? products.map((product) => {
                        return (
                          <div data-aos="fade-up" key={product.name}>
                            <ProductCardStyleOne datas={product} />
                          </div>
                        );
                      })
                    : 'No Products Found'}
                </div>

                {/* <div className="w-full h-[164px] overflow-hidden mb-[40px]">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/ads-1.png`}
                    alt="test"
                    className="w-full h-full object-contain"
                  />
                </div> */}
                {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={products}
                    startLength={7}
                    endLength={products.length}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
