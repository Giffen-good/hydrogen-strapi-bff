import {useProduct} from '@shopify/hydrogen/client';

/**
 * A client component that tracks a selected variant and/or selling plan state, as well as callbacks for modifying the state
 */
export default function ProductOptions() {
  const {options, setSelectedOption, selectedOptions} = useProduct();
  // Default Title
  if (options[0].name !== 'Color') options.reverse();
  return (
    <div className={`product-options mb-7 ${options[0].values[0] === 'Default Title' ? 'hidden': ''}`}>
      {options.map(({name, values}) => {
        return (
          <OptionsWidget
            setSelectedOption={setSelectedOption}
            selectedOptions={selectedOptions}
            values={values}
            name={name}
            key={name}
          />
        );
      })}
    </div>
  );
}
function OptionsWidget({name, values, selectedOptions, setSelectedOption}) {
  const settings = {name, values, selectedOptions, setSelectedOption};
  if (name === 'Color') {
    return <SimpleView {...settings} />;
  } else {
    return <ButtonView {...settings} />;
  }
}
function ButtonView({name, values, selectedOptions, setSelectedOption}) {
  return (
    <fieldset key={name} className="mt-8">
      <div className="grid items-center text-center flex-wrap gap-4 grid-cols-3">
        {values.map((value) => {
          const checked = selectedOptions[name] === value;
          const id = `option-${name}-${value}`;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option[${name}]`}
                value={value}
                checked={checked}
                onChange={() => setSelectedOption(name, value)}
              />
              <div
                className={`hover:bg-gray-900 hover:text-white p-2 rounded-xl border cursor-pointer  text-sm md:text-md ${
                  checked ? 'bg-gray-900 text-white' : 'text-gray-900'
                }`}
              >
                {value}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function SimpleView({name, values, selectedOptions, setSelectedOption}) {
  return (
    <fieldset
      aria-labelledby={name}
      key={name}
      className=" flex  items-center justify-between gap-4"
    >
      <div className={'w-full flex  items-center justify-between gap-4'}>
        <legend className=" text-sm font-medium text-gray-900">
          <span className={'text-gray-300'}>{`${name}: `}</span>
          <span className={'font-semibold'}>{selectedOptions[name]}</span>
        </legend>
        <div className="inline-block flex ">
          {values.map((value) => {
            const checked = selectedOptions[name] === value;
            const id = `option-${name}-${value}`;

            return (
              <label key={id} htmlFor={id} className={'pl-3'}>
                <input
                  className="sr-only"
                  type="radio"
                  id={id}
                  name={`option[${name}]`}
                  value={value}
                  checked={checked}
                  onChange={() => setSelectedOption(name, value)}
                />
                <div
                  className={`cursor-pointer text-sm md:text-md ${
                    checked ? 'text-gray-300' : 'text-gray-900'
                  }`}
                >
                  {value}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}
