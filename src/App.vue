<template>
  <div id="app">
    <button @click="getContent()">getContent</button>
    <button @click="$refs.editor.setHtml('<h1>123</h1><h2>123</h2>')">setContent</button>
    <button @click="$refs.editor.appendHtml('<h1>123</h1><h2>123</h2>')">appendContent</button>
    <button @click="$refs.editor.insertHtml('pppppppaaa')">insertHtml</button>
    <vue-rich-editor :canEdit="true" ref="editor"></vue-rich-editor>
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
    this.$refs.editor.setHtml('<h1>123</h1><h2>123</h2><p>132</p><a href="#45">666</a><a href="#45">666</a>123456123456' +
      '<img src="https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-770954.jpg">')
  },
  methods:{
    getContent () {
      console.log(this.$refs.editor.getHtml())
    }
  }
}
</script>

<style lang="scss">
</style>
