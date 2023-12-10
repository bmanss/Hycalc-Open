import React, { useEffect } from "react";
import { useState } from "react";

export const InputCounter = ({ value, onChange, min, max, inputWidth, floating, precision, step }) => {
  const [counterValue, setCounterValue] = useState(() => {
    const val = value ?? 0;
    return Number(val).toFixed(precision ?? 0);
  });

  // if value manually changed update it
  useEffect(() =>{
    if (value !== counterValue){
      setCounterValue(Number(value).toFixed(precision ?? 0));
    }
  },[value])

  function updateValue(newVal) {
    let val = Math.max(min ?? 0, Math.min(max ?? 0, newVal));
    val = floating ? val : Math.floor(val);
    val = precision ? val.toFixed(precision) : val;
    setCounterValue(val);
    onChange && onChange(Number(val));
  }

  function handleSetCounter(value) {
    if (/^\d+(\.\d*)?$/.test(value)) {
      setCounterValue(value);
    } else {
      setCounterValue(counterValue);
    }
  }

  return (
    <span className='inputCounter'>
      <input
        style={{ width: inputWidth && inputWidth }}
        value={counterValue}
        onChange={(e) => handleSetCounter(e.target.value)}
        onBlur={(e) => updateValue(e.target.value)}></input>
      <span style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => updateValue(parseFloat(counterValue) + (step || 1))}>
          <img width={15} height={15} src='/images/arrowUp.png' alt='arrowUp' />
        </button>
        <button onClick={() => updateValue(parseFloat(counterValue) - (step || 1))}>
          <img width={15} height={15} src='/images/arrowDown.png' alt='arrowDown' />
        </button>
      </span>
    </span>
  );
};

export default InputCounter;
