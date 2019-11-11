export default function prevenClickOnReadOnly(){
    document.querySelector('#editor img').addEventListener('click', (e)=>{
        if(!this.editMode){
            e.stopPropagation()
        }
    })
}