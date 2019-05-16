<template>
  <div id="app">
    <button @click="getContent()">getContent</button>
    <button @click="$refs.editor.setContent('<h1>123</h1><h2>123</h2>')">setContent</button>
    <vue-rich-editor ref="editor"></vue-rich-editor>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods:{
    getContent () {
      console.log(this.$refs.editor.getContent())
    }
  }
}
</script>

<style lang="scss">
</style>
