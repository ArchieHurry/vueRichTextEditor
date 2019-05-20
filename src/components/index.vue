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
        sel: null,
        range: null
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
      },
      timelyGetHtml: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.timeId = new Date().valueOf()
    },
    mounted () {
      this.__init()
    },
    methods: {
      appendHtml  (html) {
        this.range = null;
        this.insertHtml(html)
      },
      setHtml (html) {
        const s = this;
        s.content.innerHTML = html;
        if (s.timelyGetHtml) s.$emit('htmlChange', s.content.innerHTML)
      },
      getHtml () {
        return this.content.innerHTML
      },
      insertHtml(html) {
        const s = this;
        let dom = s.content;
        if (!s.sel || !s.range) { // 没有取得焦点插入末尾
          dom.innerHTML = dom.innerHTML + html;
          return;
        }
        let sel = s.sel, range = s.range;
        if (window.getSelection) {
          if (sel.getRangeAt && sel.rangeCount) {
            range.deleteContents(); // 移除range中的内容
            let el = document.createElement('div');
            el.innerHTML = html;
            let frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
              lastNode = frag.appendChild(node);
            }
            range.insertNode(frag); // 在Range的起始位置插入节点的方法,如果是一个文本节点，这文本节点被拆分
            if (lastNode) {
              range = range.cloneRange();
              range.setStartAfter(lastNode); // 在lastNode后开始节点
              range.collapse(true); // 节点折叠刀开始节点
              sel.removeAllRanges();
              sel.addRange(range);
            }
          }
        } else if (document.selection && document.selection.type !== "Control") {
          document.selection.createRange().pasteHTML(html);
        }
        s.__getSelAndRange();
        if (s.timelyGetHtml) s.$emit('htmlChange', s.content.innerHTML)
      },
      formatNodes (tagName) {
        const s = this;
        if (!s.range) return;
        let cloneRange = s.range.cloneContents();
        s.range.deleteContents();
        let el = document.createElement(tagName);
        el.appendChild(cloneRange);
        s.range.insertNode(el);
        el = null;cloneRange = null;
      },
      __getSelAndRange () {
        this.sel = window.getSelection();
        try { this.range = this.sel.getRangeAt(0);} catch (e) { this.range = null }
      },
      __init () {
        const s = this;
        s.toolbar = document.getElementById('toolbar' + s.timeId);
        s.content = document.getElementById('content' + s.timeId);
        E.addHandler(s.content,'mouseup', function () {
          s.__getSelAndRange()
        });
        E.addHandler(s.content,'input', function () {
          s.__getSelAndRange();
          if (s.timelyGetHtml) s.$emit('htmlChange', s.content.innerHTML)
        });
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
      height: 23px;
      background-color: #DCE8E8;
      color: #555555;
      border-bottom: 1px solid #cccccc;
    }
    &_buttonDiv {
      user-select: none;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      width: 16px;
      padding: 5px;
      float: left;
      &:hover{
        font-weight: bold;
      }
    }
    &_content {
      width: 100%;
      top: 24px;
      bottom: 0;
      background-color: white;
      position: absolute;
      overflow: auto;
      outline: none;
    }
  }
</style>
