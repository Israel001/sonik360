import ProductCardRowStyleOne from './Cards/ProductCardRowStyleOne';
import DataIteration from './DataIteration';
import { IProduct } from './SearchBox';

export interface ISectionStyleTwo {
  [x: string]: any;
  products: IProduct[];
}

export default function SectionStyleTwo({
  className,
  products,
}: ISectionStyleTwo) {
  return (
    <div
      className={`section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 ${
        className || ''
      }`}
    >
      {products.map((product) => {
        return <ProductCardRowStyleOne datas={product} />;
      })}
      {/* <DataIteration datas={products} startLength={0} endLength={4}>
        {({ datas }) => (
          <div key={datas.id} className="item w-full">
            <ProductCardRowStyleOne datas={datas} />
          </div>
        )}
      </DataIteration> */}
    </div>
  );
}
