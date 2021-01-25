<template>
  <div>
    <button @click="openUrl('/G6')">G6</button>
    <button @click="openUrl('/atnd')">atnd</button>
    <button @click="openUrl('/quill')">quill</button>
  </div>
</template>

<script>
export default {
  methods: {
    openUrl(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style>
</style>