import { useEffect, useState } from 'react';
import { IOrder } from '..';

export default function OrderTab({ orders }: { orders: IOrder[] }) {
  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        {!orders.length ? (
          <div>You don't have any orders</div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              {/* table heading */}
              <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
                <td className="py-4 block whitespace-nowrap text-center">
                  Order
                </td>
                <td className="py-4 whitespace-nowrap text-center">
                  Date Ordered
                </td>
                <td className="py-4 whitespace-nowrap text-center">
                  Date Completed
                </td>
                <td className="py-4 whitespace-nowrap text-center">Status</td>
                <td className="py-4 whitespace-nowrap text-center">Amount</td>
                <td className="py-4 whitespace-nowrap  text-center">Action</td>
              </tr>
              {/* table heading end */}
              {orders.map((order) => {
                return (
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="text-center py-4">
                      <span className="text-lg text-qgray font-medium">
                        #{order.id}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="text-base text-qgray  whitespace-nowrap">
                        {new Date(order.dateOrdered).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="text-base text-qgray  whitespace-nowrap">
                        {order.dateCompleted
                          ? new Date(order.dateCompleted).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span
                        className="text-sm rounded text-green-500 bg-green-100 p-2"
                        style={
                          order.status !== 'Completed'
                            ? { color: 'white', background: 'red' }
                            : {}
                        }
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="text-base text-qblack whitespace-nowrap px-2 ">
                        &#x20A6;{order.amount}
                      </span>
                    </td>
                    <td className="text-center py-4">
                      <button
                        type="button"
                        className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
