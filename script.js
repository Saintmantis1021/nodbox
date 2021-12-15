

   
window.addEventListener("resize", function(){
    window.resizeTo(800,600);
    });
const { app, BrowserWindow ,ipcMain,ipcRenderer} = require("electron");



document.getElementById("openafile").addEventListener("click",myFun);
function myFun(){
ipcRenderer.send("openafile")

}
ipcRenderer.on("reply",(event,data)=>{
    console.log("success")
    window.location.href = "imgtopdf2.html";
})
  