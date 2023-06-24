import { ICategory } from '../../AllProductPage/ProductsFilter';

export interface ICategoryCard {
  background?: string;
  title?: string;
  subCategories?: ICategory[];
  seeMoreUrl?: string;
}

export default function CategoryCard({
  background,
  title,
  subCategories = [],
  seeMoreUrl,
}: ICategoryCard) {
  return (
    <div
      className="category-card-wrappwer w-full h-full p-[30px]"
      style={{
        background: `url(${
          background ||
          `${process.env.PUBLIC_URL}/assets/images/section-category-1.jpg`
        }) no-repeat`,
        backgroundSize: 'cover',
      }}
    >
      <div>
        <h1 className="text-base font-600 tracking-wide mb-2">{title}</h1>
        <div className="brands-list mb-[7px]">
          <ul>
            {subCategories.slice(0, 6).map((sc, i) => {
              return (
                <li key={i}>
                  <a href={`/products?filter[subCategory]=${sc.name}`}>
                    <span className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize">
                      {sc.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <a href={seeMoreUrl}>
          <div className="flex space-x-2 items-center">
            <h1 className="text-base font-600 tracking-wide mb-2">Shop Now</h1>
            <span>
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2.08984"
                  y="0.636719"
                  width="6.94219"
                  height="1.54271"
                  transform="rotate(45 2.08984 0.636719)"
                  fill="#1D1D1D"
                />
                <rect
                  x="7"
                  y="5.54492"
                  width="6.94219"
                  height="1.54271"
                  transform="rotate(135 7 5.54492)"
                  fill="#1D1D1D"
                />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
