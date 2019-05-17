<template>
  <div id="app">
    <button @click="getContent()">getContent</button>
    <button @click="$refs.editor.setContent('<h1>123</h1><h2>123</h2>')">setContent</button>
    <button @click="$refs.editor.appendContent('<h1>123</h1><h2>123</h2>')">appendContent</button>
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
  mounted () {
    this.$refs.editor.setContent('<h1>123</h1><h2>123</h2><p>132</p><a href="#45">666</a><a href="#45">666</a>123456123456')
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
