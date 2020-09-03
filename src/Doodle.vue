<template>
  <div>
    <p>{{ msg }}</p>
  </div>  
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: 'Hello Vue'
    }
  }
}
</script>

