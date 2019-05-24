# vueRichTextEditor

> Rich Text Editor made with Vue

## English [中文文档](https://github.com/ArchieHurry/vueRichTextEditor/blob/master/README_ZH.md)

### How to use

``` bash
import vueRichEditor from 'vue-rich-text-editor';
Vue.use(vueRichEditor)

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
|setLanguage|Setting Language, Chinese and English can be set by langType|[language.js](https://github.com/ArchieHurry/vueRichEditor/tree/master/src/components/language.js)|

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
