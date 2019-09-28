<template>
  <div>
    <p>
      <button class="confirmbuttonclass buyclassbtn" @click="lookAround">
        随便看看
      </button>
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