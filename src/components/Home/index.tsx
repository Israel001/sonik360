import { useEffect, useState } from 'react';
import datas from '../../data/products.json';
import SectionStyleFour from '../Helpers/SectionStyleFour';
import SectionStyleOne from '../Helpers/SectionStyleOne';
import SectionStyleThree from '../Helpers/SectionStyleThree';
import SectionStyleTwo from '../Helpers/SectionStyleTwo';
import ViewMoreTitle from '../Helpers/ViewMoreTitle';
import Layout from '../Partials/Layout';
import Ads from './Ads';
import Banner from './Banner';
import BestSellers from './BestSellers';
import BrandSection from './BrandSection';
import CampaignCountDown from './CampaignCountDown';
import ProductsAds from './ProductsAds';
import { useAppContext } from '../../context/appcontext';
import { IProduct } from '../Helpers/SearchBox';

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default function Home() {
  const [ads, setAds] = useState(false);
  const [gadgetProducts, setGadgetProducts] = useState<IProduct[]>([]);
  const [electronicsProducts, setElectronicsProducts] = useState<IProduct[]>(
    [],
  );
  const [newArrivals, setNewArrivals] = useState<IProduct[]>([]);
  const [topSellingProducts, setTopSellingProducts] = useState<IProduct[]>([]);
  const adsHandle = () => {
    setAds(false);
  };
  useEffect(() => {
    setAds(true);
  }, []);

  const { subCategories } = useAppContext();

  const fetchSomeProducts = async (products: string, stateSetter: Function) => {
    const response = await fetch(
      `${baseUrl}/products/some-products?names=${products}`,
    ).then((response) => response.json());
    stateSetter(response);
  };

  const fetchSpecialCategoryProducts = async (
    name: string,
    stateSetter: Function,
  ) => {
    const response = await fetch(
      `${baseUrl}/products/special-categories/${name}`,
    ).then((response) => response.json());
    stateSetter(response);
  };

  useEffect(() => {
    fetchSomeProducts(
      ['Iphone 14 Pro Max', 'JBL Flip 5', 'HP Elitebook 1030 G2'].join(','),
      setGadgetProducts,
    );
    fetchSomeProducts(
      ['Hisense', 'Maxi 1', 'Maxi'].join(','),
      setElectronicsProducts,
    );
    fetchSpecialCategoryProducts('New Arrivals', setNewArrivals);
    fetchSpecialCategoryProducts('Top Selling Products', setTopSellingProducts);
  }, []);

  return (
    <>
      <Layout>
        {ads && <Ads handler={adsHandle} />}
        <div className="btn w-5 h-5 "></div>
        <Banner className="banner-wrapper mb-[60px]" />
        <SectionStyleOne
          products={gadgetProducts}
          brands={[]}
          subCategories={
            subCategories && subCategories.length
              ? subCategories.filter(
                  (sc) => sc.__mainCategory__!.name.toLowerCase() === 'gadgets',
                )
              : []
          }
          categoryTitle="AY WILL THINK ABOUT IT"
          sectionTitle="Gadgets World"
          seeMoreUrl={`/products?filter[category]=Gadgets`}
          className="category-products mb-[60px]"
        />
        <BrandSection
          sectionTitle="Shop by Brand"
          className="brand-section-wrapper mb-[60px]"
        />
        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2023-03-04 4:00:00"
        />
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/products?filter[specialCategory]=Top Selling Products"
          categoryTitle="Top Selling Products"
        >
          <SectionStyleTwo products={topSellingProducts} />
        </ViewMoreTitle>
        {/* <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Best Saller"
        >
          <BestSellers />
        </ViewMoreTitle> */}
        <ProductsAds
          ads={[
            `${process.env.PUBLIC_URL}/assets/images/ads-1.png`,
            `${process.env.PUBLIC_URL}/assets/images/ads-2.png`,
          ]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOne
          categoryBackground={`${process.env.PUBLIC_URL}/assets/images/section-category-2.jpg`}
          subCategories={
            subCategories && subCategories.length
              ? subCategories.filter(
                  (sc) =>
                    sc.__mainCategory__!.name.toLowerCase() === 'electronics',
                )
              : []
          }
          products={electronicsProducts}
          brands={[]}
          categoryTitle="Electronics"
          sectionTitle="Electronics World"
          seeMoreUrl={`/products?filter[category]=Electronics`}
          className="category-products mb-[60px]"
        />
        <ProductsAds
          ads={[`${process.env.PUBLIC_URL}/assets/images/ads-3.png`]}
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleThree
          products={newArrivals}
          sectionTitle="New Arrivals"
          seeMoreUrl="/products?filter[specialCategory]=New Arrivals"
          className="new-products mb-[60px]"
        />
        <ProductsAds
          sectionHeight="164"
          ads={[`${process.env.PUBLIC_URL}/assets/images/ads-4.png`]}
          className="products-ads-section mb-[60px]"
        />
        {/* <SectionStyleFour
          products={gadgetProducts}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        /> */}
      </Layout>
    </>
  );
}
