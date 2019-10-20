<template>
  <main id="Main">
    <div class="user" v-if="currentUser">
      <button @click="signout">Signout</button>
    </div>
    <div class="editor-wrapper">
        <div class="toolbar-wrapper" :class="{hide:!editMode}">
            <div id="toolbar" >
                <span class="ql-formats">
                    <select class="ql-font"></select>
                    <select class="ql-size"></select>
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
        </div>
        <div id="editor-container" :style="checkQuillState">

        </div>
        <button @click="toggleEdit" class="edit" :style="{left : editBtnLeftVal+'px', top: editBtnTopVal+ 'px'}">Toggle Editmode</button>
        <button @click="getDelta">Get Delta</button>
    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
import {mapGetters, mapActions} from 'vuex'
import imageUrl from '../helpers/quillHandlers.js'
// Quill.register('modules/imageResize', ImageResize)
export default {
    name: 'Main',
    data(){
        return{
            editBtnLeftVal: 0,
            editBtnTopVal: 30,
            quill: null,
            quillOptions:{
                theme: 'snow',
                placeholder: 'Knowledge that will remain forever starts here!',
                modules:{
                    toolbar: {
                        container: '#toolbar',
                        handlers: {
                            image: imageUrl
                        }
                    },
                    // toolbar: [
                    //     ['bold', 'italic', 'underline', 'strike', 'link'],  // toggled buttons
                    //     ['blockquote', 'code-block'],
                    //     ['video', 'formula', 'image'],
                    //     [{ 'header': 1 }, { 'header': 2 }],                 // custom button values
                    //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    //     [{ 'script': 'sub'}, { 'script': 'super' }],        // superscript/subscript
                    //     [{ 'indent': '-1'}, { 'indent': '+1' }],            // outdent/indent
                    //     [{ 'direction': 'rtl' }],                           // text direction

                    //     [{ 'size': ['small', false, 'large', 'huge'] }],    // custom dropdown
                    //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    //     [{ 'color': [] }, { 'background': [] }],            // dropdown with defaults from theme
                    //     [{ 'font': [] }],
                    //     [{ 'align': [] }],
                    //     ['clean']                                           // remove formatting button
                    // ]
                    // handlers: {
                    //     image: imageUrl
                    // }
                }
            },
            editMode: false
        }
    },
    computed:{
        ...mapGetters(['currentUser', 'getMainContent']),
        setToolbar(){
            if(this.editMode)   return "#toolbar-container"
            return false
        },
        checkQuillState(){
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
        }
    },
    watch:{
        getMainContent(value){
            console.log(value)
            if(value.length>0){
                this.quill.setContents(value)
            }
        }
    },
    methods:{
        enableQuillCheck(){
            if(this.editMode){
                this.quill.enable()
            }else{
                this.quill.enable(false)
            }
        },
        toggleEdit(){
            this.editMode = !this.editMode
            this.enableQuillCheck()
        },
        signout(){
            firebase.auth().signOut()
        },
        getDelta(){
            console.log(this.quill.getContents())
            console.log(this.quill.root.innerHTML)
        },
    },
    mounted(){
        this.quill = new Quill('#editor-container', this.quillOptions)
        this.enableQuillCheck()
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
