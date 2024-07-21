import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import { evaluate, fraction, abs, format } from "mathjs";
import {
  btnValues,
  operator,
  scientific,
  numbers,
} from "./Data";
import Header from "./components/Header";
import Trigonometry from "./components/Trigonometry";

const App = () => {
  const [screenValue, setScreenValue] = useState("");
  const [result, setResult] = useState("");
  const [isInverted, setIsInverted] = useState(false);
  const [isDeg, setIsDeg] = useState(false);
  const [ans, setAns] = useState("");

  const parenthesesBalance = (input) => {
    const regex = /[\(\)]/g;
    const stack = [];
    const matches = input.match(regex);
    if (!matches) return true;
    for (let bracket of matches) {
      if (bracket === "(") {
        stack.push(bracket);
      } else {
        let openBracket = stack.pop();
        if (bracket === ")" && openBracket !== "(") {
          return false;
        }
      }
    }
    return stack.length === 0;
  };

  const calculation = (text) => {
    let value = "";
    if (
      !operator.includes(text[text.length - 1]) &&
      parenthesesBalance(text)
    ) {
      const multiply = text.replaceAll("×", "*");
      const division = multiply.replaceAll("÷", "/");
      const root = division.replaceAll("√", "sqrt");
      const piValue = root.replaceAll("π", "pi");
      const logValue = piValue.replaceAll("log", "log10");
      const lnValue = logValue.replaceAll("ln", "log");
      const answer = lnValue.replaceAll("Ans", ans);
      value = answer;
      if(isDeg) {
        const sinValue = text.replaceAll(/(?<!a)sin\((\d+)\)/g, "sin(unit($1, 'deg'))");
        const cosValue = sinValue.replaceAll(/(?<!a)cos\((\d+)\)/g, "cos(unit($1, 'deg'))");
        const tanValue = cosValue.replaceAll(/(?<!a)tan\((\d+)\)/g, "tan(unit($1, 'deg'))");
        value = tanValue;
      }
      const result = evaluate(value);
      if (result?.type) {
        return `${result.re}${result.im <= 0 ? "" : "+"}${result.im}i`;
      } else return result;
    }
  };

  useEffect(() => {
    setResult(calculation(screenValue));
  },[isDeg])

  const handleClick = (e) => {
    let value = e.target.innerText;
    const prevChar = numbers.includes(screenValue[screenValue.length - 1]);
    if (value === "√") value = "√(";
    else if (value === "3√") value = "^(1÷3)";
    else if (value === "sin") value = "sin(";
    else if (value === "cos") value = "cos(";
    else if (value === "tan") value = "tan(";
    else if (value === "sinh") value = "sinh(";
    else if (value === "cosh") value = "cosh(";
    else if (value === "tanh") value = "tanh(";
    else if (value === "sin-1") value = "asin(";
    else if (value === "cos-1") value = "acos(";
    else if (value === "tan-1") value = "atan(";
    else if (value === "sinh-1") value = "asinh(";
    else if (value === "cosh-1") value = "acosh(";
    else if (value === "tanh-1") value = "atanh(";
    else if (value === "ln") value = "ln(";
    else if (value === "log") value = "log(";
    else if (value === "10x") value = "10^";
    else if (value === "ex") value = "e^";
    else if (value === "1/x") value = "(1/(";
    else if (value === "×10x") prevChar ? (value = "×10^") : (value = "");
    else if (value === "x2") prevChar ? (value = "^2") : (value = "");
    else if (value === "x3") prevChar ? (value = "^3") : (value = "");
    else if (value === "xy") prevChar ? (value = "^") : (value = "");
    else if (value === "%") prevChar ? (value = "%") : (value = "");
    else if (value === "x!") prevChar ? (value = "!") : (value = "");
    else if (value === "EXP") prevChar ? (value = "E") : (value = "");
    else if (value === "INV") {
      value = "";
      setIsInverted(!isInverted);
    } else if (value === "Ans") {
      if (
        screenValue.length === 0 ||
        operator.includes(screenValue[screenValue.length - 1])
      ) {
        value = "Ans";
      } else {
        value = "×Ans";
      }
    }

    const inputValue = screenValue + value;
    if (operator.includes(inputValue[0])) return alert("Invalid value");
    setScreenValue(inputValue);
    if (!operator.includes(value)) {
      setResult(calculation(inputValue));
    }
    if (
      operator.includes(value) &&
      operator.includes(screenValue[screenValue.length - 1])
    ) {
      const sign = screenValue.slice(0, -1) + value;
      setScreenValue(sign);
    }
  };

  const handleDel = () => {
    const text = screenValue.slice(0, -1);
    setScreenValue(text);
    setResult(calculation(text));
  };

  const handleClear = () => {
    setScreenValue("");
    setResult("");
  };

  const handleAns = () => {
    if (result) {
      setScreenValue(calculation(screenValue));
      setAns(result);
      setResult("");
    }
  };

  const handleSD = () => {
    if (result === "" && screenValue !== "") {
      if (
        screenValue.toString().includes("e") ||
        screenValue.toString().includes("/")
      ) {
        const toDecimal = evaluate(screenValue);
        setScreenValue(toDecimal);
      } else {
        const toFraction = fraction(screenValue);
        const value = `${toFraction.s === 1 ? "" : "-"} ${toFraction.n} ${
          toFraction.d === 1 ? "" : `/ ${toFraction.d}`
        }`;
        setScreenValue(value);
      }
    }
  };

  const handleToDeg = () => {
    setIsDeg(true);
  };

  const handleToRad = () => {
    setIsDeg(false);
  };

  const handleAbs = () => {
    if (result === "") {
      setScreenValue(abs(screenValue));
    }
  };

  const handleENG = () => {
    if (result === "" && screenValue) {
      const formatEng = format(Number(screenValue), {
        notation: "engineering",
      });
      setScreenValue(formatEng);
    }
  };

  return (
    <>
      <div className="w-screen flex justify-center text-white mt-10">
        <div className="w-96 card bg-zinc-700 px-4 py-12">
          <Header />
          <Display
            screenValue={screenValue}
            setScreenValue={setScreenValue}
            result={result}
          />
          <div className="grid grid-cols-6 gap-4 my-4">
            <Button
              title={"DEG"}
              color={isDeg ? "bg-orange-700" : "bg-slate-900"}
              onClick={handleToDeg}
            />
            <Button
              title={"RAD"}
              color={!isDeg ? "bg-orange-700" : "bg-slate-900"}
              onClick={handleToRad}
            />
            {scientific.flat().map((value, i) => (
              <Button
                key={i}
                title={value}
                color="bg-slate-900"
                onClick={
                  value === "Abs"
                    ? handleAbs
                    : value === "ENG"
                    ? handleENG
                    : value === "S↔D"
                    ? handleSD
                    : handleClick
                }
              />
            ))}
            <Trigonometry isInverted={isInverted} handleClick={handleClick} />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {btnValues.flat().map((value) => (
              <Button
                key={value}
                title={value}
                color={(value === "DEL" || value === "AC") && "bg-red-800"}
                onClick={
                  value === "DEL"
                    ? handleDel
                    : value === "AC"
                    ? handleClear
                    : value === "="
                    ? handleAns
                    : handleClick
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
