


async function uploadFile(files,fieldName,imgpath){
    if(files && Object.keys(files).length != 0 &&  files[fieldName] && files[fieldName].name) 
	{
     // const imgname = Date.now()+'_'+files[fieldName].name;
     const imgname = Date.now()+'.'+(files[fieldName].name).split('.').pop();
      await files[fieldName].mv(imgpath+imgname);
      return imgname;
    }else{
      return "";
    }   
}

module.exports = {
    uploadFile,
}