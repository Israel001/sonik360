import { useState } from "react";
import "./style.css";

export interface ISelectbox {
  datas?: any[];
  className?: string;
  action?: (v: string) => void;
  children?: (param: { item: string }) => JSX.Element;
}

export default function Selectbox({ datas = [], className, action, children }: ISelectbox) {
  const [item, setItem] = useState(datas[0]);
  const [toggle, setToggle] = useState(false);
  const handler = (e: any, value: string) => {
    if (action) {
      action(value);
    }
    setItem(value);
    setToggle(!toggle);
  };
  return (
    <>
      {datas.length > 0 && (
        <div className={`my-select-box ${className || ""}`}>
          <button
            onClick={() => setToggle(!toggle)}
            type="button"
            className="my-select-box-btn "
          >
            {children ? children({ item }) : <span>{item}</span>}
          </button>
          {toggle && (
            <div
              className="click-away"
              onClick={() => setToggle(!toggle)}
            ></div>
          )}
          <div className={`my-select-box-section ${toggle ? "open" : ""}`}>
            <ul className="list">
              {datas.map((value) => (
                <li
                  className={item === value ? "selected" : ""}
                  key={Math.random() + value}
                  onClick={(e) => handler(e, value)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
