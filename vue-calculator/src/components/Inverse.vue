<template>
  <div class="grid grid-cols-6 gap-4 mb-4">
    <button
      class="py-2 text-center button-shadow rounded-md bg-slate-900"
      @click="$emit('handleClick', '10^')"
    >
      10<sup>x</sup>
    </button>
    <button
      class="py-2 text-center button-shadow rounded-md bg-slate-900"
      @click="$emit('handleClick', '∛(')"
    >
      <sup>3</sup>√
    </button>
    <Button title="hyp" color="bg-slate-900" @click="handleHyp" />
    <div class="col-span-3">
      <div v-if="isHyp" class="grid grid-cols-3 gap-4">
        <button
          class="py-2 text-center button-shadow rounded-md bg-slate-900"
          @click="$emit('handleClick', 'asinh(')"
        >
          sinh<sup>-1</sup>
        </button>
        <button
          class="py-2 text-center button-shadow rounded-md bg-slate-900"
          @click="$emit('handleClick', 'acosh(')"
        >
          cosh<sup>-1</sup>
        </button>
        <button
          class="py-2 text-center button-shadow rounded-md bg-slate-900"
          @click="$emit('handleClick', 'atanh(')"
        >
          tanh<sup>-1</sup>
        </button>
      </div>
      <div v-else class="grid grid-cols-3 gap-4">
        <button
          class="py-2 text-center button-shadow rounded-md bg-slate-900"
          @click="$emit('handleClick', 'asin(')"
        >
          sin<sup>-1</sup>
        </button>
        <button
          class="py-2 text-center button-shadow rounded-md bg-slate-900"
          @click="$emit('handleClick', 'acos(')"
        >
          cos<sup>-1</sup>
        </button>
        <button
          class="py-2 text-center button-shadow rounded-md bg-slate-900"
          @click="$emit('handleClick', 'atan(')"
        >
          tan<sup>-1</sup>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
defineProps(["isHyp"]);
const emit = defineEmits(["hyper", "handleClick"]);
const handleHyp = () => {
  emit("hyper");
};
</script>

<style lang="scss" scoped></style>
