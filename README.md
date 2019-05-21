# vueRichTextEditor

> Rich Text Editor made with Vue

## <a name="english">English</a> <a href="#中文文档">中文文档</a>

### How to use

``` bash
import vueRichEditor from 'vue-rich-text-editor';
Vue.use(vueRichEditor)

<vue-rich-editor ref="editor"></vue-rich-editor>
```

### vueRichTextEditor API Doc

#### props

| Parameters | Description | Type | Optional values | Default value |
|---------- |-------- |---------- |---------- |---------- |
|height|-| String | Y | '400px' |
|canEdit|-| Boolean | Y | true |
|timelyGetHtml| Whether to get HTML in time |Boolean|Y|false|

#### methods

| Method name | Description | Parameters |
|---------- |-------- |---------- |
|appendHtml| Insert HTML at the end of the document | - |
|setHtml| - | - |
|getHtml| - | - |
|insertHtml|Insert HTML at the cursor| html |

#### emit
| emit name | Description
|--------------|--------------|
|htmlChange| if timelyGetHtml is true, this can return html of editor timely |


### Browser support

##### IE10+, chrome, firefox or other modern Browser


## <a name="中文文档">中文文档</a> <a href="#english">English</a> 

### 怎样使用

``` bash
import vueRichEditor from 'vue-rich-text-editor';
Vue.use(vueRichEditor)

<vue-rich-editor ref="editor"></vue-rich-editor>
```

### vueRichTextEditor API Doc

#### props

| 名称 | 描述 | 类型 | 可选参数 | 默认值 |
|---------- |-------- |---------- |---------- |---------- |
|height|-| String | Y | '400px' |
|canEdit|-| Boolean | Y | true |
|timelyGetHtml|是否及时获取html |Boolean|Y|false|

#### methods

|方法名 | 描述 | 参数 |
|---------- |-------- |---------- |
|appendHtml| 在文档结尾插入html | - |
|setHtml| - | - |
|getHtml| - | - |
|insertHtml| 在光标处插入html | html |

#### emit
| emit 名称 | 描述 |
|--------------|--------------|
|htmlChange| 如何 timelyGetHtml 为true,他可以及时的返回编辑器里的html |


### 浏览器支持情况

##### IE10+, chrome, firefox 和其他现代浏览器
