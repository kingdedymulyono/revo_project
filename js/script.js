// const href = () => {
//     window.location.href="./test.htm"
// }
const btn2=document.querySelectorAll('.btn2');
const sendBtn=document.getElementById("sendBtn")
const btnf=document.getElementById("btnF")
const filterBox=document.getElementById("filterBox");
const textInput=document.getElementById("textInput");
const deadlineInput=document.getElementById("deadlineInput")
var i=0;
var x=0;
const check = () => {
    if(i==0){

        btn2.forEach(function(b){
            b.classList.add("bg-blue-500");
            b.classList.add("shadow-blue-500");
        })
        i=1;   // btn2.classList.add("bg-blue-500")
    }else{
        btn2.forEach(function(b){
            b.classList.remove("bg-blue-500");
            b.classList.remove("shadow-blue-500");
        })
        i=0;
    }
}

const showFilter = () => {
    if(x==0){
        filterBox.style.display='block'
        x=1;
    }else{
        filterBox.style.display='none'
        x=0
    }
    
}
sendBtn.addEventListener("click",() => {
    sendData();
})
const sendData = () => {
    var textValue=textInput.value;
    var deadlineValue=deadlineInput.value;
    if(textValue=='' || deadlineValue == ''){
        alert("hytamm");
        console.log("apcb hytam")
    }else{
        console.log(textValue);
        console.log(deadlineValue);
    }
}