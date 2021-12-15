window.addEventListener("resize", function(){
    window.resizeTo(800,600);
    });
const { app, BrowserWindow ,ipcMain,ipcRenderer} = require("electron");

function myFunction(){
    console.log("hhh")
    ipcRenderer.send("whereto")
   }
document.getElementById("btn1").addEventListener("click", myFunction);



ipcRenderer.on("imgtopdf",(event,data)=>{
    console.log("success")
    window.location.href = "imgtopdf3.html";
})