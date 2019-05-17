<template>
  <div :id="`vueRichEditor${timeId}`" :style="{height: height}" class="vre_vueRichEditor">
    <div :id="`toolbar${timeId}`" class="vre_toolbar">
      <div class="vre_buttonDiv" @click="formatNodes('h1')">h1</div>
      <div class="vre_buttonDiv" @click="formatNodes('h2')">h2</div>
      <div class="vre_buttonDiv" @click="formatNodes('b')">b</div>
    </div>
    <div :id="`content${timeId}`" :contenteditable="canEdit" class="vre_content"></div>
  </div>
</template>

<script>
  import E from './eventHandler'
  export default {
    name: "vueRichEditor",
    data () {
      return {
        content: null,
        toolbar: null,
        timeId: '',
        nodes: []
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
      formatNodes (tagName) {
        const s = this
        for (let i = 0; i < s.nodes.length; i++) {
          let val = s.nodes[i]
          let newNode = document.createElement(tagName)
          newNode.appendChild( val.cloneNode(true))
          val.parentNode.replaceChild(newNode, val)
        }
      },
      init () {
        const s = this;
        s.toolbar = document.getElementById('toolbar' + s.timeId);
        s.content = document.getElementById('content' + s.timeId);
        E.addHandler(s.content,'mouseup', function () {
          let sel = window.getSelection()
          s.nodes = []
          let flag = false
          for (let i = 0; i < s.content.childNodes.length; i++) {
            let val = s.content.childNodes[i]
            if (val.isSameNode(sel.getRangeAt(0).startContainer.parentNode) || val.isSameNode(sel.anchorNode)) flag = true
            if (flag) s.nodes.push(val)
            if (val.isSameNode(sel.getRangeAt(0).endContainer.parentNode) || val.isSameNode(sel.focusNode)) flag = false
          }
        })
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
