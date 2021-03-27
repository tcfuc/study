<template>
  <div class="header">
    <a-dropdown>
      <a-menu
        slot="overlay"
        @click="handleMenuClick"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN"> 中文 </a-menu-item>
        <a-menu-item key="enUS"> English </a-menu-item>
      </a-menu>
      <a-button >
        切换语言 <a-icon type="down" />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleMenuClick({ key }) {
      this.$router.push({ query: { ...this.$route.query, locale: key } });
      this.$i18n.locale = key;
    },
  },
};
</script>

<style scoped>
.header {
  float: right;
  margin-right: 30px
}
</style>