# vueRichTextEditor

> 使用vue编写的富文本组件

### 怎样使用

## [在线例子](http://www.bqmyweb.cn/vuerichtexteditor/)

``` bash
import vueRichEditor from 'vue-rich-text-editor';
Vue.use(vueRichEditor)

<vueRichTextEditor ref="editor"></vueRichTextEditor>
```

### vueRichTextEditor API文档

#### props

|名称|描述|类型|可选参数|默认值|
|----------|--------|----------|----------|----------|
|height|-|String|Y|'400px'|
|canEdit|-|Boolean|Y|true|
|timelyGetHtml|是否及时获取html|Boolean|Y|false|
|langType|语言类型,可选值'EN','CN'|String|Y|'EN'|
|confirmCallBack(type, html)|编辑了超链接和图片的回调函数,需要返回html|Function|Y|return html|
|imgUploadCallBack(event)|点击上传图片后的回调函数|Function|Y|以base64格式插入选择的图片|

#### methods

|方法名|描述|参数|
|----------|--------|----------|
|appendHtml|在文档结尾插入html|-|
|setHtml|-|-|
|getHtml|-|-|
|insertHtml|在光标处插入html|html|
|setLanguage|设置语言，中英文可以通过langType设置|[见language.js](https://github.com/ArchieHurry/vueRichEditor/tree/master/src/components/language.js)|

#### emit
|emit 名称|描述|
|--------------|--------------|
|htmlChange|如何 timelyGetHtml 为true,他可以及时的返回编辑器里的html|

### 浏览器支持情况

##### IE10+, chrome, firefox 和其他现代浏览器

### 升级的内容

#### 0.0.6 (2019-5-24 16:22:25)

增加了图片编辑和上传功能

#### 0.0.5（2019-5-22 16:13:22）

- 增加了编辑超链接的功能

[更多版本信息](https://github.com/ArchieHurry/vueRichTextEditor/blob/master/version.md)
