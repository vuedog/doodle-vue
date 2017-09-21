<template>
  <div>
    <p>{{ template }}</p>
  </div>  
</template>

<script>
export default {
  props: ['msg'],
  data () {
    return {template: this.msg || 'default msg'}
  }
}
</script>

