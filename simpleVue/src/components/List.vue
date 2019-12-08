<template>
  <div class="title">
    {{title}}
  </div>
</template>

<script>

export default {
  name: 'List',
  components: {
  },
  data() {
    return {
      title: '你好'
    };
  },
  methods: {
  },
  computed: {
  },
  props: {
  },
  mounted() {
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped >
.title {
  font-size: 14px;
  font-weight: bold;
}
</style>
