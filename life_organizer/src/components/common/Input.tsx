export function Input({
  divClassName,
  inputClassName,
  label,
  type,
  name,
  placeholder,
  required,
  value,
  defaultValue,
}: {
  divClassName?: string;
  inputClassName?: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
}) {
  return (
    <div className={divClassName}>
      <label>{label}</label>
      <input
        className={inputClassName}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  );
}