<template>
  <div className="w-screen flex justify-center text-white mt-10">
    <div className="w-96 card bg-zinc-700 px-4 py-12">
      <Header />
      <Display :result="result" :screenValue="screenValue" />
      <Power
        :isRad="isRad"
        @handleClick="(number) => handleClick(number)"
        @inverse="isInverse = !isInverse"
        @toRad="handleRad"
        @toDeg="handleDeg"
      />
      <Trigonomentry
        @handleClick="(number) => handleClick(number)"
        :isInverse="isInverse"
      />
      <div class="grid grid-cols-6 gap-4 mb-4">
        <Button title="ENG" color="bg-slate-900" @click="handleENG"></Button>
        <Button
          title="("
          color="bg-slate-900"
          @click="handleClick('(')"
        ></Button>
        <Button
          title=")"
          color="bg-slate-900"
          @click="handleClick(')')"
        ></Button>
        <Button title="S↔D" color="bg-slate-900" @click="handleSD"></Button>
        <Button title="Abs" color="bg-slate-900" @click="handleAbs"></Button>
        <Button
          title="EXP"
          color="bg-slate-900"
          @click="handleClick('E')"
        ></Button>
      </div>
      <Actions
        @handleClick="
          (number) => {
            number === 'AC'
              ? handleClear()
              : number === 'DEL'
              ? handleDel()
              : number === '='
              ? handleEqual()
              : handleClick(number);
          }
        "
      />
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Display from "./components/Display.vue";
import Power from "./components/Power.vue";
import Trigonomentry from "./components/Trigonomentry.vue";
import Actions from "./components/Actions.vue";
import Button from "./components/Button.vue";
import { reactive, ref } from "vue";
import { abs, evaluate, format, fraction } from "mathjs";

const screenValue = ref("");
const result = ref("");
const answer = ref("");
const isInverse = ref(false);
const operators = reactive(["+", "-", "×", "÷", "^"]);
const isRad = ref(true);

const handleRad = () => {
  isRad.value = true;
  result.value = handleCalculate();
};

const handleDeg = () => {
  isRad.value = false;
  result.value = handleCalculate();
};

const handleClear = () => {
  screenValue.value = "";
  answer.value = "";
  result.value = "";
};

const handleDel = () => {
  screenValue.value = screenValue.value?.slice(0, -1);
  result.value = handleCalculate();
};

const handleEqual = () => {
  screenValue.value = result.value;
  answer.value = result.value;
  result.value = "";
};

const handleENG = () => {
  if (result.value == "" && screenValue.value) {
    const ans = format(Number(screenValue.value), { notation: "engineering" });
    screenValue.value = ans;
  }
};

const handleSD = () => {
  if (result.value == "" && screenValue.value) {
    if (screenValue.value.toString().includes("/")) {
      screenValue.value = evaluate(screenValue.value);
    } else {
      const toFraction = fraction(screenValue.value);
      screenValue.value = `${toFraction.s === 1 ? "" : "-"} ${toFraction.n} ${
        toFraction.d === 1 ? "" : `/ ${toFraction.d}`
      }`;
    }
  }
};

const handleAbs = () => {
  if (result.value === "" && screenValue.value) {
    if (!screenValue.value.toString().includes("/")) {
      screenValue.value = abs(screenValue.value);
    }
  }
};
const handleClick = (number) => {
  let value = number;
  const isLastIdxOperator = operators.includes(
    screenValue.value[screenValue.value?.length - 1]
  );
  const isCurrentOperator = operators.includes(number);

  if (value === "Ans") {
    if (answer.value) {
      if (screenValue.value.length === 0 || isLastIdxOperator) value = "Ans";
      else value = "×Ans";
    } else {
      value = "";
    }
  } else if (isLastIdxOperator && isCurrentOperator) {
    screenValue.value = screenValue.value.slice(0, -1) + number;
    value = "";
  }
  const input = screenValue.value + value;
  if (operators.includes(input[0])) return alert("Invalid Input");
  screenValue.value = input;
  if (!isCurrentOperator) {
    result.value = handleCalculate();
  }
};

const parenthesesBalance = (input) => {
  const matches = input.match(/[\(\)]/g);
  let stack = [];
  if (!matches) return true;
  for (let bracket of matches) {
    if (bracket === "(") {
      stack.push("(");
    } else {
      const openBracket = stack.pop();
      if (!openBracket === "(" && bracket === ")") {
        return false;
      }
    }
  }
  return stack.length === 0;
};

const handleCalculate = () => {
  let ans = "";
  const isLastOperator = operators.includes(
    screenValue.value[screenValue.value.length - 1]
  );
  if (
    screenValue.value &&
    !isLastOperator & parenthesesBalance(screenValue.value)
  ) {
    const replaceMulitply = screenValue.value.replaceAll("×", "*");
    const replaceDivider = replaceMulitply.replaceAll("÷", "/");
    const replaceln = replaceDivider.replaceAll("ln", "log");
    const replacePi = replaceln.replaceAll("π", "pi");
    const replaceRoot = replacePi.replaceAll("√", "sqrt");
    const replaceCubeRoot = replaceRoot.replaceAll("∛", "cbrt");
    const replaceAns = replaceCubeRoot.replaceAll("Ans", answer.value);
    ans = replaceAns;
    if (!isRad.value) {
      const replaceSin = replaceAns.replaceAll(
        /(?<!a)sin\((\d+)\)/g,
        "sin(unit($1, 'deg'))"
      );
      const replaceCos = replaceSin.replaceAll(
        /(?<!a)cos\((\d+)\)/g,
        "cos(unit($1, 'deg'))"
      );
      const replaceTan = replaceCos.replaceAll(
        /(?<!a)tan\((\d+)\)/g,
        "tan(unit($1, 'deg'))"
      );
      ans = replaceTan;
    }
    return evaluate(ans);
  }
};
</script>

<style lang="scss" scoped></style>
