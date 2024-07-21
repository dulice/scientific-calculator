<template>
  <div class="grid grid-cols-6 gap-4 mb-4">
    <Button
      title="RAD"
      :color="isRad ? 'bg-orange-700' : 'bg-slate-900'"
      @click="$emit('toRad')"
    />
    <Button
      title="DEG"
      :color="isRad ? 'bg-slate-900' : 'bg-orange-700'"
      @click="$emit('toDeg')"
    />
    <Button title="INV" color="bg-slate-900" @click="handleInverse" />
    <Button
      title="x!"
      color="bg-slate-900"
      @click="$emit('handleClick', '!')"
    />
    <Button title="π" color="bg-slate-900" @click="$emit('handleClick', 'π')" />
    <Button
      title="1/x"
      color="bg-slate-900"
      @click="$emit('handleClick', '(1/(')"
    />
    <Button title="%" color="bg-slate-900" @click="$emit('handleClick', '%')" />
    <button
      class="py-2 text-center button-shadow rounded-md bg-slate-900"
      @click="$emit('handleClick', 'e^')"
    >
      e<sup>x</sup>
    </button>
    <button
      class="py-2 text-center button-shadow rounded-md bg-slate-900"
      @click="$emit('handleClick', '^2')"
    >
      x<sup>2</sup>
    </button>
    <button
      class="py-2 text-center button-shadow rounded-md bg-slate-900"
      @click="$emit('handleClick', '^3')"
    >
      x<sup>3</sup>
    </button>
    <button
      class="py-2 text-center button-shadow rounded-md bg-slate-900"
      @click="$emit('handleClick', '^')"
    >
      x<sup>y</sup>
    </button>
    <Button
      title="ln"
      color="bg-slate-900"
      @click="$emit('handleClick', 'ln(')"
    ></Button>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
defineProps(['isRad'])
const emit = defineEmits(["inverse", "toDeg", "toRad", "handleClick"]);
const handleInverse = () => {
  emit("inverse");
};
</script>
