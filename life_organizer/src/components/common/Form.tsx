export default function Form({
  id,
  formTitle,
  children,
  submitButtonName,
  submitButtonClassName,
  submitForm,
}: {
  id: string;
  formTitle: string;
  children: React.ReactNode;
  submitButtonName: string;
  submitButtonClassName?: string;
  submitForm: any;
}) {
  // form action for submit
  const submit = submitForm;

  // if not classname create default
  if (!submitButtonClassName) {
    submitButtonClassName = "bg-blue-400 mx-auto p-2 rounded-xl w-fit";
  }

  return (
    <div className="flex flex-col p-5 bg-white bg-opacity-80 rounded-xl">
      <div className="text-2xl text-center">
        <h3>
          <b>{formTitle}</b>
        </h3>
      </div>
      <div className="flex flex-col w-1/2 mx-auto mt-5 text-center">
        <form
          id={id}
          className="flex flex-col font-bold gap-y-5"
          action={submit}
        >
          {children}
          <button className={submitButtonClassName}>{submitButtonName}</button>
        </form>
      </div>
    </div>
  );
}
