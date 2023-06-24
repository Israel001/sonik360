import { useEffect, useState } from 'react';

export interface IBrandSection {
  [x: string]: any;
}

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default function BrandSection({
  className,
  sectionTitle,
}: IBrandSection) {
  const [brands, setBrands] = useState<string[]>();

  const fetchBrands = async () => {
    const response = await fetch(`${baseUrl}/products/brands`).then(
      (response) => response.json(),
    );
    setBrands(response);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div data-aos="fade-up" className={`w-full ${className || ''}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5">
          <div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">
              {sectionTitle}
            </h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          {brands?.map((brand) => {
            return (
              <a href={`/products?filter[brand]=${brand}`}>
                <div className="item">
                  <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
                    <img
                      style={{ maxHeight: '100%' }}
                      src={`${
                        process.env.PUBLIC_URL
                      }/assets/images/${brand.toLowerCase()}.png`}
                      alt="logo"
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
