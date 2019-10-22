<template>
  <main id="Main">
    <div class="user" v-if="currentUser">
      <button @click="signout">Signout</button>
    </div>
    <div class="editor-wrapper">
        <quill-editor
            :options="editorOption"
            @change="onEditorChange($event)">
        >
        </quill-editor>
        <button @click="toggleEdit" class="edit" :style="{left : editBtnLeftVal+'px', top: editBtnTopVal+ 'px'}">Toggle Editmode</button>
        <button @click="getDelta">Get Delta</button>
    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
import {mapGetters, mapActions} from 'vuex'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import ImageResize from 'quill-image-resize-module/image-resize.min.js'
import { quillEditor, Quill } from 'vue-quill-editor'
Quill.register('modules/imageResize', ImageResize)

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
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['clean'],
                        ['link', 'image', 'video']
                    ],
                    syntax: {
                        highlight: (text) =>{
                            console.log(hljs.highlightAuto(text).value) 
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
        setToolbar(){
            if(this.editMode)   return "#toolbar-container"
            return false
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
            console.log('editor change!', quill, html, text)
            this.content = html
        },
        toggleEdit(){
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
#Main .toolbar-wrapper{
    transition: 1s;
    max-height: 200px;
    position: fixed;
    z-index: 10000;
    max-width: 1000px;
    top: 150px;
    transform: translate(0,-100%);
}
.editor-wrapper{
    min-width: 1000px;
    max-width: 1000px;
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
