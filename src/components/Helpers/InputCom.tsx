import { Field } from "@shopify/react-form";

export interface IInputCom {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  children?: any;
  inputHandler?: (e: any) => void;
  value?: string;
  inputClasses?: string;
  labelClasses?: string;
  inputAttr?: Field<string>;
}

export default function InputCom({
  label,
  type,
  name,
  placeholder,
  children,
  inputHandler,
  value,
  inputClasses,
  labelClasses = "text-qgray text-[13px] font-normal",
  inputAttr
}: IInputCom) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block  mb-2 ${labelClasses || ''}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative " style={inputAttr?.error ? { border: '1px solid red' } : {}}>
        <input
          placeholder={placeholder}
          value={inputAttr?.value}
          onChange={inputAttr?.onChange}
          className={`input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none ${
            inputClasses || ''
          }`}
          type={type}
          id={name}
          onBlur={inputAttr?.onBlur}
        />
      </div>
      {children && children}
    </div>
  );
}
