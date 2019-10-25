<template>
  <main id="Main">
    <div class="user" v-if="currentUser">
      <button @click="signout">Signout</button>
    </div>
    <div 
        class="editor-wrapper" 
        :style="wrapperStyling"
        :data-edit-mode="editMode"
    >
        <quill-editor
            id="editor"
            v-model="content"
            :options="editorOption"
            @change="onEditorChange($event)"
            :disabled="!editMode"
        >
        >
            <div id="toolbar" slot="toolbar" :style="toolbarStyling">
                <span class="ql-formats">
                    <select class="ql-font"></select>
                    <select class="ql-size"></select>
                </span>
                <span class="ql-format">
                    <select title="Size" class="ql-size">
                        <option value="8px">8px</option>
                        <option value="9px">9px</option>
                        <option value="10px">10px</option>
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="30px">30px</option>
                        <option value="36px">36px</option>
                        <option value="48px">48px</option>
                        <option value="64px">64px</option>
                        <option value="72px">72px</option>
                        <option value="96px">96px</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-bold"></button>
                    <button class="ql-italic"></button>
                    <button class="ql-underline"></button>
                    <button class="ql-strike"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-script" value="sub"></button>
                    <button class="ql-script" value="super"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-header" value="1"></button>
                    <button class="ql-header" value="2"></button>
                    <select class="ql-header">
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="4">Heading 4</option>
                        <option value="5">Heading 5</option>
                        <option value="6">Heading 6</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-blockquote"></button>
                    <button class="ql-code-block"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered"></button>
                    <button class="ql-list" value="bullet"></button>
                    <button class="ql-indent" value="-1"></button>
                    <button class="ql-indent" value="+1"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-direction" value="rtl"></button>
                    <select class="ql-align"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link"></button>
                    <button class="ql-image"></button>
                    <button class="ql-video"></button>
                    <button class="ql-formula"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean"></button>
                </span>
            </div>
        </quill-editor>
        <button @click="toggleEdit" class="edit" :style="{left : editBtnLeftVal+'px', top: editBtnTopVal+ 'px'}">Toggle Editmode</button>
        <!-- <button @click="getDelta">Get Delta</button> -->
    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
import {mapGetters, mapActions} from 'vuex'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import imageUrl from '@/helpers/quillHandlers.js'
import { quillEditor } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)
const Size = Quill.import('attributors/style/size');
Size.whitelist = [
    '8px',
    '9px',
    '10px', 
    '12px', 
    '14px', 
    '16px',
    '18px',
    '20px',
    '24px',
    '30px',
    '36px',
    '48px',
    '64px',
    '72px',
    '96px',
];
Quill.register(Size, true);

const BaseImageFormat = Quill.import('formats/image');
const ImageFormatAttributesList = [
    'alt',
    'height',
    'width',
    'style'
];

class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);
        




export default {
    name: 'Main',
    components:{
        quillEditor
    },
    data(){
        return{
            editBtnLeftVal: 0,
            editBtnTopVal: 30,
            editMode: false,
            content: `<h1><span class="ql-size-large" style="color: rgb(255, 255, 255);">Welcome to to your introduction page</span></h1><p><em class="ql-size-large" style="color: rgb(255, 255, 255);">This is your very own home page for your notes</em></p><p><br></p><p><span class="ql-size-large" style="color: rgb(255, 255, 255);">You can put whatever you want on your own homepage. But we some ideas for your homepage that you may want to use!</span></p><ul><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">Give an introduction about yourself!</span></li><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">Describe your collections in a short summary</span></li><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">But these are just some ideas but you can write whatever you want!</span></li></ul><p><br></p><p><img src="https://ourswissbusiness.com/wp-content/uploads/2017/01/wow-e1484418777188.png" style="display: block; margin: auto;" width="697"></p><p><br></p>`,
            editorOption: {
                modules: {
                    toolbar: {
                        container:"#toolbar",
                        handlers: {
                            image: imageUrl
                        }
                    },
                    syntax: {
                        highlight: (text) =>{
                            return hljs.highlightAuto(text).value
                        }
                    },
                    imageResize: {

                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                    }
                }
            }
        }
    },
    computed:{
        ...mapGetters(['currentUser', 'getMainContent']),
        wrapperStyling(){
            if(this.editMode){
                return {
                    'marginTop': '150px'
                    }
            }
            return{
                'border': 'none',
                'background': 'transparent',
                'marginTop': '100px'
            }
        },
        toolbarStyling(){
            if(this.editMode){
                return {
                    'transform': 'translate(-105%, 0)'
                    }
            }
            return{
                'transform': 'translate(0,0)',
                'opacity': '0',
                'pointer-events': 'none'
            }
        }
    },
    watch:{
        
    },
    methods:{
        enableQuillCheck(){
            if(this.editMode){
                this.quill.enable()
            }else{
                this.quill.enable(false)
            }
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html)
            this.content = html
        },
        toggleEdit(){
            if(this.editMode){
                // When the user has the img resize screen on
                this.$el.querySelector('#editor .ql-editor p span').click()
            }
            this.editMode = !this.editMode
        },
        signout(){
            firebase.auth().signOut()
        },
        getDelta(){
            console.log(quill.getContents())
            console.log(quill.root.innerHTML)
        },
        
    },
    mounted(){
        this.editBtnLeftVal = document.querySelector('#SideNav').offsetWidth + this.editBtnTopVal
        document.querySelector('#editor img').addEventListener('click', (e)=>{
            if(!this.editMode){
                e.stopPropagation()
            }
        })
        console.log(document.querySelector('#editor img'))
    }
}
</script>

<style>
#Main{
    flex-grow: 1;
    background: var(--secundair-color);
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
}

#Main .user{
    position: fixed;
    top: 10px;
    right: 10px;
}

#Main button.edit{
    position: fixed;
}

#Main .toolbar-wrapper.hide{
    max-height: 0;
    overflow: hidden;
    opacity: 0;
}
.ql-snow .ql-formats {
    margin: 0 !important;
    display: flex;
    /* vertical-align: middle; */
    max-width: 100px;
    flex-wrap: wrap;
    justify-content: center;
}
/* #Main #toolbar{
    max-width: 1000px;
} */
/* Experimental Styles */
#Main #toolbar{
    top: 150px;
    position: fixed;
    transition: 1s;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0;
    border: none;
    border-radius: 5px;
    transform: translate(-105%, 0);
}
div#toolbar .ql-formats >* {
    margin: 6px;
}
.editor-wrapper{
    min-width: 1000px;
    max-width: 1000px;
    transition: 1s;
}
.editor-wrapper .ql-container.ql-snow.ql-disabled{
    background: transparent;
}
.editor-wrapper .ql-container{
    min-height: 50vh;
    transition: 1s;
}
#editor-container {
    min-height: 50vh;
    transition: 1s;
}

/* Custom Rules for the Snow Theme */

.ql-toolbar.ql-snow{
    background-color: #222;
    border: 1px solid var(--contrast-color);
}

.ql-container.ql-snow{
    background-color: var(--main-color);  
    border: none;
    color:var(--contrast-color);
}

.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
    fill: var(--contrast-color);
}

.ql-snow .ql-picker{
    color:var(--contrast-color);
}

.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: var(--contrast-color);
}
.ql-snow .ql-toolbar.snow, .ql-snow .ql-stroke{
    stroke:var(--contrast-color);
}

.ql-snow.ql-toolbar button:hover,
.ql-snow .ql-toolbar button:hover,
.ql-snow.ql-toolbar button.ql-active,
.ql-snow .ql-toolbar button.ql-active,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow .ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-label.ql-active,
.ql-snow .ql-toolbar .ql-picker-label.ql-active,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow .ql-toolbar .ql-picker-item:hover,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: var(--font-color);
}
.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: var(--font-color);
}
.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow .ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow.ql-toolbar button:hover .ql-stroke-mitter,
.ql-snow .ql-toolbar button:hover .ql-stroke-mitter,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-mitter,
.ql-snow .ql-toolbar button.ql-active .ql-stroke-mitter,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-mitter,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-mitter,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-mitter,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-mitter,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-mitter,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-mitter,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-mitter,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-mitter {
    stroke: var(--font-color);
}

.ql-editor.ql-blank::before {
    color: rgba(255,99,71,0.6);
}
</style>
