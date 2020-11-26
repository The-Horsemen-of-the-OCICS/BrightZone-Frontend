<template>
  <h3>Hello, your accountType is {{ accountType }}, and your userId is {{ userId }}</h3>
</template>

<script>
export default {
  name: "MockIndex",
  data() {
    return {
      userId: this.$store.state.account.userId,
      accountType: this.$store.state.account.type,
    }
  },
}
</script>

<style scoped>

</style>
