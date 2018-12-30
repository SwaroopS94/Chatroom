<template>
  <div>
    {{message.message}}
  </div>
</template>

<script>
  export default {
    name: "message-box",
    props: {
      message: ""
    },
    mounted() {
      console.log("message : ",this.message);
    }
  }
</script>

<style scoped>

</style>