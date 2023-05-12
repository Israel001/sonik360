import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Checkbox from '../Helpers/Checkbox';
import { useEffect, useState } from 'react';

export interface IProductsFilter {
  [x: string]: any;
}

const baseUrl = process.env.REACT_APP_SERVER_URL;

export interface ICategory {
  id: number;
  name: string;
  __mainCategory__?: { id: number; name: string; }
}

export default function ProductsFilter({
  filters,
  checkboxHandler,
  volume,
  volumeHandler,
  maxPrice,
  storage,
  filterstorage,
  className,
  filterToggle,
  filterToggleHandler,
}: IProductsFilter) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  const fetchCategories = async () => {
    const response = await fetch(`${baseUrl}/categories/sub-categories`).then(
      (response) => response.json(),
    );
    setCategories(response);
  };

  const fetchBrands = async () => {
    const response = await fetch(`${baseUrl}/products/brands`).then(
      (response) => response.json(),
    );
    setBrands(response);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ''
        }  ${filterToggle ? 'block' : 'hidden lg:block'}`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Product categories
            </h1>
          </div>
          <div className="filter-items">
            <ul>
              {categories.map((category) => {
                return (
                  <li className="item flex justify-between items-center mb-5">
                    <div className="flex space-x-[14px] items-center">
                      <div>
                        <Checkbox
                          id={category.id}
                          name={category.id}
                          handleChange={(e: any) => checkboxHandler(e)}
                          checked={filters[category.id]}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={category.id.toString()}
                          className="text-xs font-black font-400 capitalize"
                        >
                          {category.name}
                        </label>
                      </div>
                    </div>
                    {/* <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div> */}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Price Range</h1>
          </div>
          <div className="price-range mb-5">
            <InputRange
              draggableTrack
              maxValue={maxPrice}
              minValue={0}
              value={volume}
              onChange={volumeHandler}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Price: ${volume.min} - ${volume.max}
          </p>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Brands</h1>
          </div>
          <div className="filter-items">
            <ul>
              {brands.map((brand) => {
                return (
                  <li className="item flex justify-between items-center mb-5">
                    <div className="flex space-x-[14px] items-center">
                      <div>
                        <Checkbox
                          id={brand}
                          name={brand}
                          handleChange={(e: any) => checkboxHandler(e)}
                          checked={filters[brand]}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={brand}
                          className="text-xs font-black font-400 capitalize"
                        >
                          {brand}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Storage</h1>
          </div>
          <div className="filter-items">
            <div className="flex space-x-[5px] flex-wrap">
              <span
                onClick={() => filterstorage('64GB')}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === '64GB'
                    ? 'bg-qyellow text-qblack border-none'
                    : ' text-qgray '
                }`}
              >
                64GB
              </span>
              <span
                onClick={() => filterstorage('128GB')}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === '128GB'
                    ? 'bg-qyellow text-qblack border-none'
                    : ' text-qgray '
                }`}
              >
                128GB
              </span>
              <span
                onClick={() => filterstorage('256GB')}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === '256GB'
                    ? 'bg-qyellow text-qblack border-none'
                    : ' text-qgray '
                }`}
              >
                256GB
              </span>
              <span
                onClick={() => filterstorage('512GB')}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === '512GB'
                    ? 'bg-qyellow text-qblack border-none'
                    : ' text-qgray '
                }`}
              >
                512GB
              </span>
              <span
                onClick={() => filterstorage('1024GB')}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === '1024GB'
                    ? 'bg-qyellow text-qblack border-none'
                    : ' text-qgray '
                }`}
              >
                1024GB
              </span>
            </div>
          </div>
        </div> */}
        {/* <div className="filter-subject-item pb-10 mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Sizes</h1>
          </div>
          <div className="filter-items">
            <ul>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeS"
                      name="sizeS"
                      handleChange={(e: any) => checkboxHandler(e)}
                      checked={filters.sizeS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeS"
                      className="text-xs font-black font-400 capitalize"
                    >
                      s
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeM"
                      name="sizeM"
                      handleChange={(e: any) => checkboxHandler(e)}
                      checked={filters.sizeM}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeM"
                      className="text-xs font-black font-400 capitalize"
                    >
                      M
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeXL"
                      name="sizeXL"
                      handleChange={(e: any) => checkboxHandler(e)}
                      checked={filters.sizeXL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeXL"
                      className="text-xs font-black font-400 capitalize"
                    >
                      XL
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeXXL"
                      name="sizeXXL"
                      handleChange={(e: any) => checkboxHandler(e)}
                      checked={filters.sizeXXL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeXXL"
                      className="text-xs font-black font-400 capitalize"
                    >
                      XXL
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeFit"
                      name="sizeFit"
                      handleChange={(e: any) => checkboxHandler(e)}
                      checked={filters.sizeFit}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeFit"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Sliem Fit
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
        {/* <button
          onClick={filterToggleHandler}
          type="button"
          className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}
      </div>
    </>
  );
}
