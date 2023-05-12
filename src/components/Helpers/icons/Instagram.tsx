export interface IInstagram {
  [x: string]: any;
}

export default function Instagram({ className }: IInstagram) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.1016 4.90039C12.6538 4.90039 13.1016 4.45268 13.1016 3.90039C13.1016 3.34811 12.6538 2.90039 12.1016 2.90039C11.5493 2.90039 11.1016 3.34811 11.1016 3.90039C11.1016 4.45268 11.5493 4.90039 12.1016 4.90039Z" />
      <path d="M8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6Z" />
      <path d="M12 16H4C1.9 16 0 14.1 0 12V4C0 1.9 1.9 0 4 0H12C14.1 0 16 1.9 16 4V12C16 14.1 14.1 16 12 16ZM4 2C3.1 2 2 3.1 2 4V12C2 13 3 14 4 14H12C12.9 14 14 12.9 14 12V4C14 3.1 12.9 2 12 2H4Z" />
    </svg>
  );
}