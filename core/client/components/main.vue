<template>
  <main class="main">
    <slot></slot>
  </main>
</template>

<script>
  import Sidebar from './sidebar'
  import Content from './content'

  export default {
    components: {
      'app-sidebar': Sidebar,
      'app-content': Content,
    },
    name: 'main'
  }
</script>

<style>
  .main {
    display: flex;
    flex: 1;
  }
</style>
