<template>
  <div v-if="isInverse">
    <Inverse @hyper="handleHyp" :isHyp="isHyp" @handleClick="(v) => handleClick(v)"/>
  </div>
  <div v-else>
    <NonInverse @hyper="handleHyp" :isHyp="isHyp" @handleClick="(v) => handleClick(v)"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Inverse from './Inverse.vue';
import NonInverse from './NonInverse.vue';
defineProps(["isInverse"]);
const emit = defineEmits(["handleClick"])
const isHyp = ref(false);
const handleHyp = () => {
    isHyp.value = !isHyp.value;
}
const handleClick = (v) => {
    emit('handleClick', v);
}

</script>

<style lang="scss" scoped></style>
