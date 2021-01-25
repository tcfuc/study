<template>
  <div>
    <a href="#">test</a>
    <antd-modal :show="show" @cancle="show = $event">
    </antd-modal>
    <a href="#" @click="show = true">modal</a>
  </div>
</template>

<script>
import AntdModal from "./modal.vue";

export default {
  components: {
    AntdModal,
  },
  data(){
    return {
      show: false
    }
  },
  watch:{
    show:function(newVal){
      console.log(newVal)
    }
  }
};
</script>

<style>
</style>