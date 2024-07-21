<template>
    <button :class="color ?? 'bg-zinc-700'" class="py-2 text-center button-shadow rounded-md">{{ title }}</button>
</template>

<script setup>
    defineProps(['title', 'color'])
</script>

<style lang="scss" scoped>

</style>