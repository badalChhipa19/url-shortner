export const Input = ({ requireField, classVariant, ...otherProp }) => {
  let variant = classVariant ? classVariant : "";

  return (
    <div className="form__input_box">
      <input
        className={`form__input ${variant}`}
        type="text"
        required={requireField}
        {...otherProp}
      />
    </div>
  );
};
