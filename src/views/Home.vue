<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Countries />
  </div>
</template>

<script>
// @ is an alias to /src
import Countries from '@/components/Countries/Countries.vue'

export default {
  name: 'Home',
  components: {
    Countries
  }
}
</script>
