# vueRichTextEditor

[![install size](https://packagephobia.now.sh/badge?p=vue-rich-text-editor)](https://packagephobia.now.sh/result?p=vue-rich-text-editor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/40bbe81620c94cc3bf179b2df808ad07)](https://app.codacy.com/project/ArchieHurry/vueRichTextEditor/dashboard)

> Rich Text Editor made with Vue

[If you like, please give me a star ♪(^∇^*)](https://github.com/ArchieHurry/vueRichTextEditor)

[如果你喜欢它，可以给我星星吗 ♪(^∇^*)](https://github.com/ArchieHurry/vueRichTextEditor)

![demo](http://www.bqmyweb.cn/vuerichtexteditor/0.0.6.PNG)

## English [中文文档](https://github.com/ArchieHurry/vueRichTextEditor/blob/master/README_ZH.md)

## [onlineDemo](http://www.bqmyweb.cn/vuerichtexteditor/)

### How to use

``` bash
import vueRichTextEditor from 'vue-rich-text-editor';
Vue.use(vueRichTextEditor)

<vueRichTextEditor ref="editor"></vueRichTextEditor>
```

### vueRichTextEditor API Doc

#### props

|Parameters|Description|Type|Optional values|Default value|
|----------|--------|----------|----------|----------|
|height|-|String|Y|'400px'|
|canEdit|-|Boolean|Y|true|
|timelyGetHtml|Whether to get HTML in time|Boolean|Y|false|
|langType|Language type, optional values'EN','CN'|String|Y|'EN'|
|confirmCallBack(type, html)|Edit callback functions for hyperlinks and images, need return HTML|Function|Y|return html|
|imgUploadCallBack(event)|Callback function after clicking upload picture button|Function|Y|Insert selected pictures in Base64 format|

#### methods

|Method name|Description|Parameters|
|----------|--------|----------|
|appendHtml|Insert HTML at the end of the document|-|
|setHtml|-|-|
|getHtml|-|-|
|insertHtml|Insert HTML at the cursor|html|
|setLanguage|Setting Language, Chinese and English can be set by langType|[language.js](https://github.com/ArchieHurry/vueRichTextEditor/tree/master/src/components/language.js)|

#### emit
|emit name|Description
|--------------|--------------|
|htmlChange|if timelyGetHtml is true, this can return html of editor timely|

### Browser support

##### IE10+, chrome, firefox or other modern Browser

### Upgraded content

#### 0.0.6 (2019-5-24 16:22:25)

Added photo editing and uploading functions

#### 0.0.5 (2019-5-22 16:13:22)

Added the function of editing hyperlinks

[more version info](https://github.com/ArchieHurry/vueRichTextEditor/blob/master/version.md)
