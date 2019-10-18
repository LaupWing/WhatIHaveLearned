<template>
  <main id="Main">
    <div class="user" v-if="currentUser">
      <button @click="signout">Signout</button>
    </div>
    <div class="editor-wrapper">
        <div id="editor-container">

        </div>
    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'Main',
    data(){
        return{
            quill: null,
            quillOptions:{
                theme: 'snow',
                placeholder: 'Knowledge that will remain forever starts here!',
                modules:{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike', 'link'],  // toggled buttons
                        ['blockquote', 'code-block'],
                        ['video', 'formula', 'image'],
                        [{ 'header': 1 }, { 'header': 2 }],                 // custom button values
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],        // superscript/subscript
                        [{ 'indent': '-1'}, { 'indent': '+1' }],            // outdent/indent
                        [{ 'direction': 'rtl' }],                           // text direction

                        [{ 'size': ['small', false, 'large', 'huge'] }],    // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }],            // dropdown with defaults from theme
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['clean']                                           // remove formatting button
                    ]
                }
            },
        }
    },
    computed:{
        ...mapGetters(['currentUser']),
    },
    methods:{
        signout(){
            firebase.auth().signOut()
        }
    },
    mounted(){
        var quill = new Quill('#editor-container', this.quillOptions)
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
.editor-wrapper{
    margin-top: 100px;
    max-width: 1000px;
}
#editor-container {
    min-height: 50vh;
}

/* Custom Rules for the Snow Theme */

.ql-toolbar.ql-snow{
    background-color: #222;
    border: 1px solid var(--contrast-color);
}

.ql-container.ql-snow{
    background-color: var(--main-color);  
    border: 1px solid var(--contrast-color);
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
    color: var(--contrast-color);
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
    fill: var(--contrast-color);
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
    stroke: var(--contrast-color);
}

.ql-editor.ql-blank::before {
    color: rgba(255,99,71,0.6);
}
</style>
