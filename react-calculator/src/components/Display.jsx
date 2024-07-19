import React from "react";

const Display = ({screenValue, result, setScreenValue}) => {
  return (
    <>
      <div className="h-24 my-4 p-4 bg-zinc-500 rounded-md display-shadow chakra-petch">
        <input
          type="text"
          className="focus:outline-none bg-zinc-500 text-3xl text-end w-full"
          value={screenValue}
          onChange={(e) => setScreenValue(e.target.value)}
          disabled
        />
        <p className="text-end">{result}</p>
      </div>
    </>
  );
};

export default Display;
