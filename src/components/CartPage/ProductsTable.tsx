import { LOCAL_STORAGE_KEYS, useAppContext } from '../../context/appcontext';
import InputQuantityCom from '../Helpers/InputQuantityCom';

export interface IProductsTable {
  [x: string]: any;
}

export default function ProductsTable({ className }: IProductsTable) {
  const { cart, setCart } = useAppContext();

  return (
    <div className={`w-full ${className || ''}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                product
              </td>
              <td className="py-4 whitespace-nowrap text-center">color</td>
              <td className="py-4 whitespace-nowrap text-center">price</td>
              <td className="py-4 whitespace-nowrap  text-center">quantity</td>
              <td className="py-4 whitespace-nowrap  text-center">total</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>
            {/* table heading end */}
            {cart.map((c, index) => {
              return (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="pl-10  py-4  w-[380px]">
                    <div className="flex space-x-6 items-center">
                      <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                        <img
                          src={c.image}
                          alt="product"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <a href={`/products/${c.id}`}>
                        <div className="flex-1 flex flex-col">
                          <p className="font-medium text-[15px] text-qblack">
                            {c.productName}
                          </p>
                        </div>
                      </a>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <div className=" flex justify-center items-center">
                      <span
                        className="w-[20px] h-[20px] block rounded-full"
                        style={{ background: `${c.color}` }}
                      ></span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <div className="flex space-x-1 items-center justify-center">
                      <span className="text-[15px] font-normal">
                        #{c.price}
                      </span>
                    </div>
                  </td>
                  <td className=" py-4">
                    <div className="flex justify-center items-center">
                      <InputQuantityCom
                        data={cart}
                        setData={setCart}
                        index={index}
                        dataType="cart"
                      />
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <div className="flex space-x-1 items-center justify-center">
                      <span className="text-[15px] font-normal">
                        #{c.price * c.quantity}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <div className="flex space-x-1 items-center justify-center">
                      <span
                        onClick={() => {
                          const clonedCart = [...cart];
                          clonedCart.splice(index, 1);
                          setCart(clonedCart);
                          localStorage.setItem(
                            LOCAL_STORAGE_KEYS.CART,
                            JSON.stringify(clonedCart),
                          );
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                            fill="#AAAAAA"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
