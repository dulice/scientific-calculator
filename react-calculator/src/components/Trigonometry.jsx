import React, { useState } from "react";
import {
  invertHypValues,
  invertValues,
  notInverHypValues,
  notInverValues,
} from "../Data";
import Button from "./Button";

const Trigonometry = ({ isInverted, handleClick }) => {
  const [isHyp, setIsHyp] = useState(false);

  const handleIsHyp = () => {
    setIsHyp(!isHyp);
  }

  return (
    <>
      {isInverted ? (
        <InverseValues isHyp={isHyp} handleClick={handleClick} handleIsHyp={handleIsHyp} />
      ) : (
        <CurrentValues isHyp={isHyp} handleClick={handleClick} handleIsHyp={handleIsHyp}/>
      )}
    </>
  );
};

export const CurrentValues = ({ isHyp, handleClick, handleIsHyp }) => {
  return (
    <>
      {isHyp
        ? notInverHypValues.map((value, i) => (
            <Button
              key={i}
              title={value}
              color={isHyp && value==="hyp" ? "bg-orange-700" : "bg-slate-900"}
              onClick={value === "hyp" ? handleIsHyp : handleClick}
            />
          ))
        : notInverValues.map((value, i) => (
            <Button
              key={i}
              title={value}
              color={isHyp && value==="hyp" ? "bg-orange-700" : "bg-slate-900"}
              onClick={value === "hyp" ? handleIsHyp : handleClick}
            />
          ))}
    </>
  );
};

export const InverseValues = ({ isHyp, handleClick, handleIsHyp }) => {
  return (
    <>
      {isHyp
        ? invertHypValues.map((value, i) => (
            <Button
              key={i}
              title={value}
              color={isHyp && value==="hyp" ? "bg-orange-700" : "bg-slate-900"}
              onClick={value === "hyp" ? handleIsHyp : handleClick}
            />
          ))
        : invertValues.map((value, i) => (
            <Button
              key={i}
              title={value}
              color={isHyp && value==="hyp" ? "bg-orange-700" : "bg-slate-900"}
              onClick={value === "hyp" ? handleIsHyp : handleClick}
            />
          ))}
    </>
  );
};

export default Trigonometry;
