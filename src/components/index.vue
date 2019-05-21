<template>
  <div :id="`vueRichEditor${timeId}`" :style="{height: height}" class="vre_vueRichEditor">
    <div :id="`toolbar${timeId}`" class="vre_toolbar">
      <div class="vre_buttonDiv vre_hover">
        <span>H</span>
        <div class="vre_hoverDiv">
          <p @click="formatNodes('H1')">H1</p>
          <p @click="formatNodes('H2')">H2</p>
          <p @click="formatNodes('H3')">H3</p>
          <p @click="formatNodes('H4')">H4</p>
          <p @click="formatNodes('H5')">H5</p>
          <p @click="formatNodes('P')">p</p>
        </div>
      </div>
      <div class="vre_buttonDiv" @click="formatNodes('STRONG')"><span>B</span></div>
      <div class="vre_buttonDiv"  @click="formatNodes('U')"><span>U</span></div>
      <div class="vre_buttonDiv" @click="formatNodes('I')"><span>I</span></div>
      <div class="vre_buttonDiv"><span>A</span></div>
    </div>
    <div :id="`content${timeId}`" :contenteditable="canEdit" class="vre_content vre_preview"></div>
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
        range: null,
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
        if (!s.canEdit) return;
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
      __getNodes () {
        const s = this
        let sel = s.sel
        s.nodes = []
        let flag = false
        for (let i = 0; i < s.content.childNodes.length; i++) {
          let val = s.content.childNodes[i]
          if (val.isSameNode(sel.getRangeAt(0).startContainer.parentNode) || val.isSameNode(sel.anchorNode)) flag = true
          if (flag) s.nodes.push(val)
          if (val.isSameNode(sel.getRangeAt(0).endContainer.parentNode) || val.isSameNode(sel.focusNode)) flag = false
        }
      },
      __formatH (tagName) { // h1-h6标签需要在选中的区域全部替换
        const s = this;
        let cloneRange = s.range.cloneContents();
        let el = document.createElement(tagName);
        el.appendChild(cloneRange);
        let html = el.innerHTML;
        if (s.nodes.length === 1) html = s.nodes[0].innerHTML;
        html = html.replace(/<h1>/g, '');
        html = html.replace(/<\/h1>/g, '<br>');
        html = html.replace(/<h2>/g, '');
        html = html.replace(/<\/h2>/g, '<br>');
        html = html.replace(/<h3>/g, '');
        html = html.replace(/<\/h3>/g, '<br>');
        html = html.replace(/<h4>/g, '');
        html = html.replace(/<\/h4>/g, '<br>');
        html = html.replace(/<h5>/g, '');
        html = html.replace(/<\/h5>/g, '<br>');
        el.innerHTML = html;
        if (s.nodes.length === 1) s.nodes[0].parentNode.replaceChild(el, s.nodes[0]);
        else { s.range.deleteContents();s.range.insertNode(el); }
        el = null;cloneRange = null;
      },
      formatNodes (tagName) {
        const s = this;
        if (!s.range) return;
        let cloneRange = s.range.cloneContents();
        let el = document.createElement(tagName);
        el.appendChild(cloneRange);
        s.__getNodes();
        if ('H1,H2,H3,H4,H5,P'.indexOf(tagName) > -1) { s.__formatH(tagName); return; }
        if (el.children.length === 1) { // 还原
          if (el.children[0].tagName === el.tagName) {
            let mid = document.createElement('span');
            let html = el.innerHTML;
            let str = `<${tagName.toLowerCase()}>`;
            str = new RegExp(str, 'g');
            let str1 = `</${tagName.toLowerCase()}>`;
            str1 = new RegExp(str1, 'g');
            html = html.replace(str, '');
            html = html.replace(str1, '');
            html = html.replace(/<span>/g, '');
            html = html.replace(/<\/span>/g, '');
            mid.innerHTML = html;
            s.range.deleteContents();
            s.range.insertNode(mid);
            el = null;cloneRange = null;
            return;
          }
        }
        s.range.deleteContents();
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
      &:hover{ span{font-weight: bold;} }
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
    &_hoverDiv {
      display: none;
      position: absolute;
      z-index: 20;
      background-color: white;
      text-align: center;
      left: 0;
      border: 1px solid #cccccc;
      width: 60px;
      padding: 5px 0;
      &:hover{
        font-weight: normal;
      }
      p{
        padding: 5px 20px;
      }
      p:hover{
        font-weight: bold;

      }
    }
    &_hover:hover{
      .vre_hoverDiv{
        display: block;
      }
    }
  }
  .vre_preview {
  }
</style>
