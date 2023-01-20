import classNames from "classnames";
function Input({ label, name, error, ...rest }) {
  return (
    <div className="form-group text-light display-6">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        className={classNames("form-control my-4", {
          "is-invalid": error,
        })}
      />
      <span className="invalid-feedback">{error}</span>
    </div>
  );
}

export default Input;
