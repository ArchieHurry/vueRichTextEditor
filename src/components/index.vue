<template>
  <div :id="`vueRichEditor${timeId}`" :style="{height: height}" class="vre_vueRichEditor">
    <div :id="`toolbar${timeId}`" class="vre_toolbar">
      <div class="vre_buttonDiv">h1</div>
      <div class="vre_buttonDiv">b</div>
    </div>
    <div :id="`content${timeId}`" :contenteditable="canEdit" class="vre_content"></div>
  </div>
</template>

<script>
  export default {
    name: "vueRichEditor",
    data () {
      return {
        content: null,
        toolbar: null,
        timeId: ''
      }
    },
    props: {
      height: {
        type: String,
        default: '400px'
      },
      canEdit: {
        type: Boolean,
        default: true
      }
    },
    created() {
      this.timeId = new Date().valueOf()
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        const s = this;
        s.toolbar = document.getElementById('toolbar' + s.timeId);
        s.content = document.getElementById('content' + s.timeId);
      },
      appendContent  (html) {
        this.content.innerHTML += html
      },
      setContent (html) {
        this.content.innerHTML = html
      },
      getContent () {
        return this.content.innerHTML
      }
    }
  }
</script>

<style lang="scss">
  .vre{
    &_vueRichEditor{
      * {
        padding: 0;
        margin: 0;
      }
      border: 1px solid #cccccc;
      position: relative;
    }
    &_toolbar {
      height: 80px;
    }
    &_content {
      width: 100%;
      top: 80px;
      bottom: 0;
      background-color: #efefee;
      position: absolute;
      overflow: auto;
    }
  }
</style>
