export interface IDataIteration {
  datas?: any[];
  startLength?: number;
  endLength: number;
  children: (param: { datas: any }) => void;
}

function DataIteration(props: IDataIteration) {
  const { datas = [], startLength, endLength, children } = props;
  return (
    <>
      {datas &&
        datas.length >= endLength &&
        datas
          .slice(startLength, endLength)
          .map((value) => children({ datas: value }))}
    </>
  );
}

export default DataIteration;
