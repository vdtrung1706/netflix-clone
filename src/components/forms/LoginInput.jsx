import cx from 'classnames';
import { useEffect, useState, memo } from 'react';

function LoginInput({
  type,
  id,
  name,
  value,
  className,
  setValue,
  placeholder,
  minLength,
  maxLength,
  validationMessage,
  validation,
}) {
  const [error, setError] = useState(false);
  const [isHide, setIsHide] = useState(true);

  useEffect(() => {
    if (typeof validation === 'function') {
      if (validation(value)) setError(false);

      if (value && !validation(value)) setError(true);
    } else {
      value.match(validation) ? setError(false) : value && setError(true);
    }
  }, [validation, validationMessage, value]);

  const toggleShow = () => {
    setIsHide((pre) => !pre);
  };

  return (
    <div className={`relative max-w-full ${className}`}>
      <div className="relative">
        <div className="relative flex items-center justify-between mb-1 transition-all duration-200 ease-in-out border-b-2 border-opacity-0 border-solid rounded bg-black-lighter border-orange-error focus-within:border-opacity-100 focus-within:bg-black-lighter-hover">
          <label htmlFor="input" className="w-full">
            <input
              id={id}
              type={type === 'password' ? (isHide ? 'password' : 'text') : type}
              name={name}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              minLength={minLength}
              maxLength={maxLength}
              className="block w-full h-12 px-5 pt-4 text-base text-white bg-transparent rounded outline-none appearance-none"
            />
            <label
              htmlFor={id}
              className={cx(
                'absolute left-5 text-sm text-grey-placeholder sibling-focus:translate-y-0 sibling-focus:text-0.7rem sibling-focus:top-1',
                'transition-all duration-100 ease-in-out transform',
                {
                  'translate-y-0 text-0.7rem top-1': value,
                  '-translate-y-1/2 text-sm top-1/2': !value,
                },
              )}
            >
              {placeholder}
            </label>
          </label>

          {type === 'password' && (
            <button
              type="button"
              title="Show Password"
              onClick={toggleShow}
              className={cx(
                'appearance-none text-grey-placeholder text-sm px-4 h-12 transition-all duration-200 active:bg-black-lighter',
                { 'opacity-0': !value },
              )}
            >
              {isHide ? 'SHOW' : 'HIDE'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <label htmlFor={id} className="mx-1 text-xs text-orange-error">
          {validationMessage}
        </label>
      )}
    </div>
  );
}

export default memo(LoginInput);
