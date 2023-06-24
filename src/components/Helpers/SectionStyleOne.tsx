import { useEffect, useState } from 'react';
import CategoryCard from './Cards/CategoryCard';
import ProductCardStyleOne from './Cards/ProductCardStyleOne';
import DataIteration from './DataIteration';
import ViewMoreTitle from './ViewMoreTitle';
import { IProduct } from './SearchBox';
import { ICategory } from '../AllProductPage/ProductsFilter';

export interface ISectionStyleOne {
  className?: string;
  categoryTitle?: string;
  sectionTitle?: string;
  seeMoreUrl?: string;
  categoryBackground?: string;
  brands?: any[];
  products?: IProduct[];
  subCategories?: ICategory[];
}

export default function SectionStyleOne({
  className,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
  brands = [],
  products = [],
  subCategories = [],
  categoryBackground,
}: ISectionStyleOne) {
  const filterBrands = brands.filter(
    (value, index, array) => array.indexOf(value) === index,
  );
  const [productLength] = useState(3);
  // useEffect(() => {
  //   if (window.matchMedia("(max-width: 1024px)")) {
  //     setLength(2);
  //   }
  // }, []);

  return (
    <div data-aos="fade-up" className={`section-style-one ${className || ''}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            <div className="category-card hidden xl:block w-full">
              <CategoryCard
                background={categoryBackground}
                title={categoryTitle}
                subCategories={subCategories}
                seeMoreUrl={seeMoreUrl}
              />
            </div>
            {products.map((product) => {
              return <ProductCardStyleOne datas={product} />;
            })}
            {/* <DataIteration
              datas={products}
              startLength={0}
              endLength={productLength}
            >
              {({ datas }) => (
                <div key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration> */}
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
