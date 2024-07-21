<template>
    <div className="h-24 my-4 p-4 bg-zinc-500 rounded-md display-shadow chakra-petch">
        <input
          type="text"
          className="focus:outline-none bg-zinc-500 text-3xl text-end w-full"
          disabled
          :value="screenValue"
        />
        <p className="text-end">{{result}}</p>
      </div>
</template>

<script setup>
defineProps(['result', 'screenValue'])
</script>