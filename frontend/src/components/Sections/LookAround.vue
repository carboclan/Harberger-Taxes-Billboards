<template>
  <div>
    <p>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    lookAround: function() {
      this.$root.lookAround();
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../styles/util.scss";
  @import "../../styles/app.scss";
</style>