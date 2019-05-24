<template>
  <div :id="`vueRichEditor${timeId}`"  class="vre_vueRichEditor">
    <div :id="`toolbar${timeId}`" class="vre_toolbar">
      <div class="vre_buttonDiv vre_hover">
        <span class="iconfont icon-H" :title="lang.H"></span>
        <div class="vre_hoverDiv">
          <p @click="__formatNodes('H1')"><i class="iconfont icon-h1"></i></p>
          <p @click="__formatNodes('H2')"><i class="iconfont icon-h2"></i></p>
          <p @click="__formatNodes('H3')"><i class="iconfont icon-h3"></i></p>
          <p @click="__formatNodes('H4')"><i class="iconfont icon-h4"></i></p>
          <p @click="__formatNodes('H5')"><i class="iconfont icon-h5"></i></p>
          <p @click="__formatNodes('P')"><i class="iconfont icon-p"></i></p>
        </div>
      </div>
      <div class="vre_buttonDiv" @click="__formatNodes('STRONG')"> <span class="iconfont icon-B" :title="lang.B"></span></div>
      <div class="vre_buttonDiv"  @click="__formatNodes('U')"><span class="iconfont icon-U" :title="lang.U"></span></div>
      <div class="vre_buttonDiv" @click="__formatNodes('I')"><span class="iconfont icon-I" :title="lang.I"></span></div>
      <div class="vre_buttonDiv">
        <span class="iconfont icon-link" @click="show.A = true" :title="lang.A"></span>
        <div class="vre_clickDiv" v-show="show.A" style="width: 215px" >
          <p style="text-align: left">
            {{lang.A_link}}
            <br>
            <input type="text" v-model="config.A.link">
          </p>
          <p style="text-align: left">
            {{lang.A_value}}
            <br>
            <input type="text" v-model="config.A.value">
          </p>
          <p>
            <button @click="__confirm('A')">confirm</button>
          </p>
        </div>
      </div>
      <div class="vre_buttonDiv">
        <span class="iconfont icon-img" @click="show.img = true" :title="lang.img"></span>
        <div class="vre_clickDiv" v-show="show.img" style="width: 215px" >
          <p style="text-align: left">
            {{lang.img_link}}
            <br>
            <input type="text" v-model="config.img.link">
          </p>
          <p style="text-align: left">
            {{lang.img_width}}
            <br>
            <input type="text" v-model="config.img.width">
          </p>
          <p style="text-align: left">
            {{lang.img_height}}
            <br>
            <input type="text" v-model="config.img.height">
          </p>
          <p>
            <button @click="__confirm('img')" >confirm</button>
          </p>
        </div>
      </div>
      <div class="vre_buttonDiv">
        <span class="iconfont icon-uploadImg" :title="lang.uploadImg" @click="$refs.imgFile.click()"></span>
        <input v-show="false" multiple accept="image/*" type="file" ref="imgFile" @change="imgUploadCallBack">
      </div>
      <div style="clear: both"></div>
    </div>
    <div :id="`content${timeId}`" :style="{height: height}" :contenteditable="canEdit" class="vre_content vre_preview"></div>
<!--    <div class="resizeBar"></div>-->
  </div>
</template>

<script>
  import E from "./eventHandler";
  import language from "./language";
  let s = null;
  export default {
    name: "vueRichTextEditor",
    data () {
      return {
        lang: {},
        show: {
          A: false,
          img: false
        },
        config: {
          A: {
            link: "",
            value: ""
          },
          img: {
            link: "",
            width: "",
            height: ""
          }
        },
        content: null,
        toolbar: null,
        timeId: "",
        sel: null,
        range: null,
        nodes: []
      };
    },
    props: {
      langType: {
        type: String,
        default: "EN"
      },
      height: {
        type: String,
        default: "380px"
      },
      canEdit: {
        type: Boolean,
        default: true
      },
      timelyGetHtml: {
        type: Boolean,
        default: false
      },
      confirmCallBack: {
        type: Function,
        default (type, html) {
          return html;
        }
      },
      imgUploadCallBack: {
        type: Function,
        default (e) {
          let files = (e.target || e.srcElement).files;
          let fun = function (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload(function () {
              s.insertHtml(s.confirmCallBack("img",`<img src="${reader.result}" style="max-width: 100%">`));
              reader.onload = null;
            });
          };
          for (let i = 0; i < files.length; i++) {
            fun(files[i]);
          }
          s.$refs.imgFile.value = "";
        }
      }
    },
    watch: {
      show : {
        handler (val) {
          if (!val.A) {
            this.config.A.link = "";
            this.config.A.value = "";
          }
          if (!val.img) {
            this.config.img.link = "";
            this.config.img.width = "";
            this.config.img.height = "";
          }
        },
        deep: true
      }
    },
    created() {
      s = this;
      this.timeId = new Date().valueOf();
      this.setLanguage(language[this.langType]);
    },
    mounted () {
      this.__init();
    },
    methods: {
      appendHtml  (html) {
        this.range = null;
        this.insertHtml(html);
      },
      setHtml (html) {
        const s = this;
        s.content.innerHTML = html;
        if (s.timelyGetHtml) {
          s.$emit("htmlChange", s.content.innerHTML);
        }
      },
      getHtml () {
        return this.content.innerHTML;
      },
      insertHtml(html) {
        const s = this;
        if (s.nodes.length === 1) {
          s.__replaceNode(s.nodes[0], html);
          return;
        }
        if (!s.canEdit) {
          return;
        }
        let dom = s.content;
        if (!s.sel || !s.range) { // 没有取得焦点插入末尾
          dom.innerHTML = dom.innerHTML + html;
          return;
        }
        let sel = s.sel, range = s.range;
        if (window.getSelection) {
          if (sel.getRangeAt && sel.rangeCount) {
            range.deleteContents(); // 移除range中的内容
            let el = document.createElement("div");
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
        if (s.timelyGetHtml) {
          s.$emit("htmlChange", s.content.innerHTML);
        }
      },
      setLanguage (language) {
        this.lang = language;
      },
      __confirm (type) {
        const s = this, o = this.config[type];
        let str = "";
        switch (type) {
          case "A":
            str = `<a href="${o.link}">${o.value}</a>`;
            break;
          case "img":
            str = `<img src="${o.link}" width="${o.width}" height="${o.height}">`;
            break;
        }
        s.insertHtml(s.confirmCallBack(type, str));
        s.show[type] = false;
      },
      __replaceNode (node, html) {
        if (!html) {
          node.parentNode.removeChild(node);
          return;
        }
        let div = document.createElement("div");
        div.innerHTML = html;
        node.parentNode.replaceChild(div.firstChild, node);
      },
      __getNodes () {
        const s = this;
        let sel = s.sel;
        s.nodes = [];
        let flag = false;
        try {
          for (let i = 0; i < s.content.childNodes.length; i++) {
            let val = s.content.childNodes[i];
            if (val.isSameNode(sel.getRangeAt(0).startContainer.parentNode) || val.isSameNode(sel.anchorNode)) { flag = true; }
            if (flag) { s.nodes.push(val); }
            if (val.isSameNode(sel.getRangeAt(0).endContainer.parentNode) || val.isSameNode(sel.focusNode)) { flag = false; }
          }
        } catch (e) {}
      },
      __formatH (tagName) { // h1-h6标签需要在选中的区域全部替换
        const s = this;
        let cloneRange = s.range.cloneContents();
        let el = document.createElement(tagName);
        el.appendChild(cloneRange);
        let html = el.innerHTML;
        if (s.nodes.length === 1) {
          html = s.nodes[0].innerHTML;
        }
        html = html.replace(/<h1>/g, "");
        html = html.replace(/<\/h1>/g, "<br>");
        html = html.replace(/<h2>/g, "");
        html = html.replace(/<\/h2>/g, "<br>");
        html = html.replace(/<h3>/g, "");
        html = html.replace(/<\/h3>/g, "<br>");
        html = html.replace(/<h4>/g, "");
        html = html.replace(/<\/h4>/g, "<br>");
        html = html.replace(/<h5>/g, "");
        html = html.replace(/<\/h5>/g, "<br>");
        html = html.replace(/<p><\/p>/g, "");
        html = html.replace(/<p><br><\/p>/g, "");
        html = html.replace(/<br><br>/g, "");
        html = html.replace(/<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig,"");
        el.innerHTML = html;
        if (s.nodes.length === 1) {
          s.nodes[0].parentNode.replaceChild(el, s.nodes[0]);
        }
        else { s.range.deleteContents();s.range.insertNode(el); }
        el = null;cloneRange = null;
      },
      __formatNodes (tagName) {
        const s = this;
        s.__getSelAndRange();
        if (!s.range) {
          return;
        }
        let cloneRange = s.range.cloneContents();
        let el = document.createElement(tagName);
        el.appendChild(cloneRange);
        s.__getNodes();
        if ("H1,H2,H3,H4,H5,P".indexOf(tagName) > -1) { s.__formatH(tagName); return; }
        if (el.children.length === 1) { // 还原
          if (el.children[0].tagName === el.tagName) {
            let mid = document.createElement("span");
            let html = el.innerHTML;
            let str = `<${tagName.toLowerCase()}>`;
            str = new RegExp(str, "g");
            let str1 = `</${tagName.toLowerCase()}>`;
            str1 = new RegExp(str1, "g");
            html = html.replace(str, "");
            html = html.replace(str1, "");
            html = html.replace(/<span>/g, "");
            html = html.replace(/<\/span>/g, "");
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
        try { this.range = this.sel.getRangeAt(0);} catch (e) { this.range = null; }
      },
      __configTarget (target) {
        switch (target.tagName) {
          case "A":
            this.config.A = {
              link: target.href,
              value: target.innerText
            };
            this.show.A = true;
            break;
          case "IMG":
            this.config.img = {
              link: target.src,
              width: target.width,
              height: target.height
            };
            this.show.img = true;
            break;
        }
      },
      __init () {
        const s = this;
        s.toolbar = document.getElementById("toolbar" + s.timeId);
        s.content = document.getElementById("content" + s.timeId);
        E.addHandler(s.content,"mouseup", function () {
          s.__getSelAndRange();
          s.__getNodes();
        });
        E.addHandler(s.content, "click", function (e) {
          if (s.show.A) { s.show.A= false; }
          if (s.show.img) { s.show.img= false; }
          if ("A,IMG".indexOf((e.target || e.srcElement).tagName) > -1) {
            if (!s.nodes.length) {
              s.nodes.push(e.target || e.srcElement);
            }
            s.__configTarget(e.target || e.srcElement);
          }
        });
        E.addHandler(s.content,"input", function () {
          s.__getSelAndRange();
          if (s.timelyGetHtml) {
            s.$emit("htmlChange", s.content.innerHTML);
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  @import url("./font.css");
  .vre{
    &_vueRichEditor{
      * {
        padding: 0;
        margin: 0;
      }
      .iconfont{
        font-size: 14px;
        font-weight: bold;
      }
      border: 1px solid #cccccc;
      position: relative;
    }
    &_toolbar {
      /*min-height: 23px;*/
      background-color: #DCE8E8;
      color: #555555;
      border-bottom: 1px solid #cccccc;
      input{
        width: 100%;
        height: 22px;
        outline: none;
      }
      button{
        width: 100%;
        font-size: 12px;
        background-color: white;
        border: 1px solid #cccccc;
        padding: 5px 0;
        cursor: pointer;
        outline: none;
      }
    }
    &_buttonDiv {
      position: relative;
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
      &:hover{ span{ color: black;} }
    }
    &_content {
      width: 100%;
      background-color: white;
      overflow: auto;
      outline: none;
      ol,ul{
        margin-left: 20px;
      }
    }
    &_hoverDiv,  &_clickDiv {
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
        color: black;
      }
    }
    &_clickDiv{
      display: block;
      box-shadow: 0 0 5px rgba(0,0,0,0.2);
      p:hover{
        font-weight: normal;
      }
    }
    &_hover:hover{
      .vre_hoverDiv{
        display: block;
      }
    }
  }
  .resizeBar {
    height: 2px;
    background-color: #DCE8E8;
    position: absolute;
    bottom: -2px;
    width: 100%;
    cursor: n-resize;
  }
</style>
