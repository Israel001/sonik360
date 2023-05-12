import { ICart } from '../../context/appcontext';

export default function InputQuantityCom({
  data,
  setData,
  index,
  dataType
}: {
    data: ICart[];
    setData: (v: ICart[]) => void;
    index: number;
    dataType: string;
}) {
  const increment = () => {
    const clonedData = [...data];
    clonedData[index || 0].quantity += 1;
    setData(clonedData);
    localStorage.setItem(dataType, JSON.stringify(clonedData))
  };

  const decrement = () => {
    if (data[index || 0].quantity > 1) {
      const clonedData = [...data];
      clonedData[index || 0].quantity -= 1;
      setData(clonedData);
      localStorage.setItem(dataType, JSON.stringify(clonedData))
    }
  };

  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={decrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{data[index || 0].quantity}</span>
        <button
          onClick={increment}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
