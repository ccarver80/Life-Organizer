export default function Select({
  label,
  name,
  options,
  divClassName,
  selectClassName,
}: {
  label: string;
  name: string;
  options: { key: string; value: string }[];
  divClassName?: string;
  selectClassName?: string;
}) {
  if (!divClassName) {
    divClassName = "flex flex-col mx-auto";
  }

  if (!selectClassName) {
    selectClassName = "border border-black rounded-xl p-2";
  }
  return (
    <div className={divClassName}>
      <label>{label}</label>
      <select className={selectClassName} name={name}>
        {options
          ? options.map((option) => {
              if (option.value === "") {
                return <option disabled>{option.key}</option>;
              } else {
                return <option value={option.value}>{option.key}</option>;
              }
            })
          : ""}
      </select>
    </div>
  );
}
