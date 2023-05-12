import { useCallback } from 'react';
import { useState } from 'react';
import { useHideOnClickOutside } from '../../../hooks/useHideOnClickOutside';
import { LOCAL_STORAGE_KEYS } from '../../../context/appcontext';

export interface ISearchBox {
  [x: string]: any;
}

const baseUrl = process.env.REACT_APP_SERVER_URL;

export interface IProduct {
  attributes: string;
  availability: number;
  brand: string;
  colors: string;
  image: string;
  name: string;
  price: number;
  type: string;
  reviews: string;
  shortDescription: string;
  __category__: { id: number; name: string };
}

export default function SearchBox({ className }: ISearchBox) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownData, setDropdownData] = useState<IProduct[]>([]);
  const [searchOngoing, setSearchOngoing] = useState(false);

  const { ref } = useHideOnClickOutside(setShowDropdown);

  const handleSearch = useCallback(async () => {
    if (searchQuery) {
      const response = await fetch(
        `${baseUrl}/products/search/${searchQuery}`,
      ).then((response) => response.json());
      setDropdownData(response.data);
      setShowDropdown(true);
      setSearchOngoing(false);
      return response.data;
    } else {
      setShowDropdown(false);
    }
    setSearchOngoing(false);
    return [];
  }, [searchQuery]);

  return (
    <>
      <div
        className={`w-full h-full flex items-center  border border-qgray-border bg-white ${
          className || ''
        }`}
      >
        <div className="flex-1 bg-red-500 h-full">
          <form className="h-full" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              className="search-input"
              placeholder="Search Product..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyUp={async (event) => {
                if (event.code === 'Enter') {
                  location.href = `/products?search=${searchQuery}`;
                }
                if (!searchOngoing) {
                  setSearchOngoing(true);
                  setTimeout(handleSearch, 1000);
                }
              }}
            />
          </form>
        </div>
        {showDropdown && dropdownData && dropdownData.length ? (
          <div
            ref={ref}
            style={{
              background: 'white',
              zIndex: '1000',
              position: 'absolute',
              top: '66px',
              width: '423px',
              boxShadow: '0 4px 2px 2px -2px gray',
              borderRadius: '8px',
            }}
          >
            {dropdownData.map((data, i) => {
              if (i < 5) {
                return (
                  <div
                    style={{
                      display: 'flex',
                      cursor: 'pointer',
                      alignItems: 'center',
                      padding: '0 20px',
                      borderBottom:
                        '1px solid rgb(239 239 239 / var(--tw-border-opacity))',
                      marginBottom: '10px',
                    }}
                    className="search-item"
                  >
                    <img src={`${baseUrl}/${data.image}`} width="100" />
                    <span
                      style={{
                        display: 'block',
                        marginLeft: '25px',
                        fontSize: '1.1rem',
                      }}
                    >
                      {data.name}
                    </span>
                  </div>
                );
              }
            })}
            {dropdownData.length > 5 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  color: 'blue',
                  cursor: 'pointer',
                }}
                onClick={async () => {
                  location.href = `/products?search=${searchQuery}`;
                }}
              >
                {`View All (${dropdownData.length - 5} more items)`}
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        {/* <div className="w-[1px] h-[22px] bg-qgray-border"></div> */}
        {/* <div className="flex-1 flex items-center px-4">
          <button
            type="button"
            className="w-full text-xs font-500 text-qgray flex justify-between items-center"
          >
            <span>All Categories</span>
            <span>
              <svg
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="9.18359"
                  y="0.90918"
                  width="5.78538"
                  height="1.28564"
                  transform="rotate(135 9.18359 0.90918)"
                  fill="#8E8E8E"
                />
                <rect
                  x="5.08984"
                  y="5"
                  width="5.78538"
                  height="1.28564"
                  transform="rotate(-135 5.08984 5)"
                  fill="#8E8E8E"
                />
              </svg>
            </span>
          </button>
        </div> */}
        <button
          className="search-btn w-[93px] h-full text-sm font-600 text-white"
          type="button"
          onClick={async () => {
            const data = await handleSearch();
            if (data.length) {
              location.href = `/products?search=${searchQuery}`;
            }
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}
