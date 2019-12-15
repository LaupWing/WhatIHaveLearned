<template>
  <main id="Main">
    <Settings/>
    <div 
        class="editor-wrapper" 
        :style="wrapperStyling"
        :data-edit-mode="editMode"
        @animationend="animEnded"
    >
        <quill-editor
            id="editor"
            :content="content"
            :options="editorOption"
            @change="onEditorChange($event)"
            @blur="test($event)"
            :disabled="!getSettings.editMode"
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
                    <button class="ql-list" value="ordered"></button>
                    <button class="ql-list" value="bullet"></button>
                    <button class="ql-indent" value="-1"></button>
                    <button class="ql-indent" value="+1"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-blockquote"></button>
                    <button class="ql-code-block"></button>
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
        <div v-if="saving" class="message">
            <h3>Saving...</h3>
        </div>
        <!-- <button @click="getDelta">Get Delta</button> -->
    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
import {mapGetters, mapActions} from 'vuex'
import Settings from './parts/Settings'
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
        quillEditor,
        Settings
    },
    data(){
        return{
            saving: false,
            counter: null,
            secondsAfterChange:0,
            autoSaveLimit: 5,
            editBtnLeftVal: 0,
            editBtnTopVal: 30,
            editMode: false,
            contentChange: false,
            content: null,
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
    watch:{
        getMainContent(newContent, oldContent){
            if(oldContent===null){
                this.content = this.getMainContent
            }
        },
        getMainContentTransition(newTransition, oldTransition ){
            if(!this.contentChange && this.getMainContentTransition !== null){
                this.contentChange = true
                this.$el.querySelector('.editor-wrapper').classList.add(this.getMainContentTransition)
            }
        }
    },
    computed:{
        ...mapGetters(['currentUser', 'getMainContent', 'getMainContentTransition', 'getSettings', 'allCollections', 'getSettings', 'getCurrentLocation']),
        wrapperStyling(){
            if(this.getSettings){
                let styleObj = {
                    'marginTop': '50px',
                    'maxWidth': this.getSettings.maxWidth +'px',
                    'minWidth': this.getSettings.minWidth + 'px',
                }
                if(this.getSettings.editMode){
                    styleObj.marginTop = '150px'
                }
                if(this.getSettings.align === 'left'){
                    styleObj.alignSelf = 'flex-start'
                }
                if(this.getSettings.align === 'center'){
                    styleObj.alignSelf = 'center'
                }
                if(this.getSettings.align === 'right'){
                    styleObj.alignSelf = 'flex-end'
                }
                return styleObj
            }
        },
        toolbarStyling(){
            if(this.getSettings.editMode){
                return {
                    'transform': 'translate(0, -100%)',
                    'z-index': '1000',
                    'maxWidth': this.getSettings.maxWidth +'px',
                    'minWidth': this.getSettings.minWidth +'px'
                 }
            }
            let styleObj ={
                'transform': 'translate(0,0)',
                'opacity': '0',
                'pointer-events': 'none'
            }
            if(this.getSettings){
                styleObj.maxWidth = this.getSettings.maxWidth +'px'
                styleObj.minWidth = this.getSettings.minWidth +'px'
            }
            return styleObj
        }
    },
    methods:{
        ...mapActions(['setMainContent', 'setMainContentTransition', 'updateIntroduction', 'updateCollection']),
        test(obj){
            const range = {
                index: obj.selection.savedRange.index,
                length: obj.selection.savedRange.length
            }
            // this.quillEditor.formatText(range.index, range.length, 'background', '#3399FF');
        },
        animEnded(){
            const container = this.$el.querySelector('.editor-wrapper')
            if(this.getMainContentTransition === null){
                container.classList.remove(...container.classList)
                container.classList.add('editor-wrapper')
            }
            if(!this.contentChange) return
            if(this.getMainContentTransition === 'leftFadeOut'){
                container.classList.remove(this.getMainContentTransition)
                this.content = this.getMainContent
                this.setMainContentTransition(null)
                container.classList.add('rightFadeIn')
                this.contentChange = false
            }
            if(this.getMainContentTransition === 'rightFadeOut'){
                container.classList.remove(this.getMainContentTransition)
                this.content = this.getMainContent
                this.setMainContentTransition(null)
                container.classList.add('leftFadeIn')
                this.contentChange = false
            }
        },
        onEditorChange({ quill, html, text }) {
            this.setMainContent(html)
            if(this.counter === null){
                this.secondsAfterChange = 0
                this.counter = setInterval(()=>{
                    this.secondsAfterChange = this.secondsAfterChange +1
                    if(this.secondsAfterChange === this.autoSaveLimit){
                        clearInterval(this.counter)
                        this.counter = null
                        this.saving = true
                        this.updateContent()
                        this.secondsAfterChange = 0
                    }
                },1000)
            }
        },
        async updateContent(){
            if(this.getCurrentLocation.type === 'introduction'){
                await this.updateIntroduction(this.getMainContent)
                console.log('updating')
                this.saving = false
                return 
            }
        },
        toggleEdit(){
            if(this.editMode){
                // When the user has the img resize screen on
                const clickToUncheck = Array.from(this.$el.querySelectorAll('#editor .ql-editor span'))
                if(clickToUncheck.length >0){
                    clickToUncheck[0].click()
                }
                else{
                    document.querySelector('#editor ql.editor').click()
                }
            }
            this.editMode = !this.editMode
        },
        signout(){
            firebase.auth().signOut()
        },
    },
    async mounted(){
        this.editBtnLeftVal = document.querySelector('#SideNav').offsetWidth + this.editBtnTopVal
    }
}
</script>

<style>
#Main{
    flex-grow: 1;
    background: white;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    --max-width: 1000px;
    overflow-x: hidden;
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
}
#Main #toolbar{
    position: fixed;
    transition: 1s;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    max-width: var(--max-width);
    border-radius: 5px;
}
div#toolbar .ql-formats >* {
    margin: 6px;
}
.editor-wrapper{
    min-width: var(--max-width);
    max-width: var(--max-width);
    transition: 1s;
    overflow-x: hidden;
    margin: 0 20px;
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
    background-color: white;  
    border: none;
    color:black;
    font-family: 'Open Sans', sans-serif;
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
.rightFadeIn{
    animation: forwards .5s fadeInRight;
}
.rightFadeOut{
    animation: forwards .5s fadeInRight reverse;
}
/* .left{
    animation: forwards .5s fadeInLeft;
} */
.leftFadeOut{
    animation: forwards .5s fadeOutLeft;
}
.leftFadeIn{
    animation: forwards .5s fadeOutLeft reverse;
}
.message{
    position: fixed;
    right: 20px;
    bottom:10px;
    color: black;
    font-size: 1.5em;
    animation: fade 2s infinite;
}
</style>
