<template>
  <div class="grid grid-cols-6 gap-4 mb-4">
    <Button
      title="log"
      color="bg-slate-900"
      @click="$emit('handleClick', 'log(')"
    />
    <Button
      title="√"
      color="bg-slate-900"
      @click="$emit('handleClick', '√(')"
    />
    <Button title="hyp" color="bg-slate-900" @click="handleHyp" />
    <div class="col-span-3">
      <div v-if="isHyp" class="grid grid-cols-3 gap-4">
        <Button
          title="sinh"
          color="bg-slate-900"
          @click="$emit('handleClick', 'sinh(')"
        />
        <Button
          title="cosh"
          color="bg-slate-900"
          @click="$emit('handleClick', 'cosh(')"
        />
        <Button
          title="tanh"
          color="bg-slate-900"
          @click="$emit('handleClick', 'tanh(')"
        />
      </div>
      <div v-else class="grid grid-cols-3 gap-4">
        <Button
          title="sin"
          color="bg-slate-900"
          @click="$emit('handleClick', 'sin(')"
        />
        <Button
          title="cos"
          color="bg-slate-900"
          @click="$emit('handleClick', 'cos(')"
        />
        <Button
          title="tan"
          color="bg-slate-900"
          @click="$emit('handleClick', 'tan(')"
        />
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
