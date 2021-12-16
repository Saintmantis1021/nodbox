
const electron = require("electron");
const { app, BrowserWindow ,ipcMain,dialog,mainWindow,remote} = electron;
const path = require('path')
const fs = require('fs');
const imgToPDF = require('image-to-pdf');
try {
  require('electron-reloader')(module)
} catch (_) {}







function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    maximizable: false,
    webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
    nodeIntegrationInWorker: true,
      
     
    }
  })
  mainWindow.isResizable(false)


  mainWindow.loadFile('imgtopdf.html')

}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.on("openafile",(event)=>{

  options={
  title:"select", 
  buttonLabel:"select", 
  defaultPath:app.getPath('desktop'),
  properties:['openFile','multiSelections']
}

  dialog.showOpenDialog(options).then((result)=>{

  console.warn("res",result)
  pages=result.filePaths
  console.warn(pages)


  if(result.canceled==false){
    event.reply("reply","true")
    console.warn("test2")
    
  }
  else{
console.warn("file not selected")
  }
})
  
})



ipcMain.on("whereto",(event)=>{

options={
  title:"select the file",
  defaultPath:"Untitled",

}

dialog.showSaveDialog(options).then((result)=>{
  out=result.filePath+".pdf"
  console.warn(out)
  if(result.canceled==false){
    event.reply("imgtopdf","true")
    console.warn("test2")
    
  }
  else{
console.warn("file not selected")
  }
  console.warn("test3")




})


})


ipcMain.on("imgtopdf_convert",(event)=>{

console.warn("started converting imgtopdf")
console.warn(pages)
console.warn(out)
imgToPDF(pages, 'A4').pipe(fs.createWriteStream(out));
event.reply("imgtopdfconvertfinal","true")
console.warn("test4")

})




app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})




