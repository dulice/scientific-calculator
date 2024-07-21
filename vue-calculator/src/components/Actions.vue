<template>
  
  <div class="grid grid-cols-5 gap-4">
    <Button
      v-for="number in numbersButtons.flat()"
      :title="number"
      :key="number"
      :color="(number === 'DEL' || number === 'AC') && 'bg-red-800'"
      @click="$emit('handleClick', number)"
    ></Button>
    <button class="py-2 text-center button-shadow rounded-md bg-zinc-700" @click="$emit('handleClick', '×10^')">
      ×10<sup>x</sup>
    </button>
    <Button title="Ans" @click="$emit('handleClick', 'Ans')"/>
    <Button title="=" @click="$emit('handleClick', '=')"/>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import Button from "./Button.vue";

const numbersButtons = reactive([
  ["7", "8", "9", "DEL", "AC"],
  ["4", "5", "6", "×", "÷"],
  ["1", "2", "3", "+", "-"],
  ["0", "."],
]);
</script>

<style lang="scss" scoped></style>
