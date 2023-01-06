const path = require('path')

const uploadSingleFile = async (fileObject, file) => {
    let uploadPath = path.resolve(__dirname, `../public/images/${file}`);
    // get image extension name
    let extName = path.extname(fileObject.name)
    // get image name(without extension)
    let baseName = path.basename(fileObject.name, extName)

    // create finale path
    let finalName = `${baseName}-${Date.now()}${extName}`
    let finalPath = `${uploadPath}/${finalName}`

    // Use the mv() method to place the file somewhere on your server
    try {
        await fileObject.mv(finalPath)
        return finalName;
    } catch (err) {
        console.log('check error: ', err);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        }
    }
}

const uploadMultipleFile = async (fileArr) => {
    let uploadPath = path.resolve(__dirname, '../public/images/upload');
    let resultArr = [];
    let countSuccess = 0;
    for (let i = 0; i < fileArr.length; i++) {
        let extName = path.extname(fileArr[i].name)
        let baseName = path.basename(fileArr[i].name, extName)
        let finalName = `${baseName}-${Date.now()}${extName}`
        let finalPath = `${uploadPath}/${finalName}`

        try {
            await fileArr[i].mv(finalPath)
            resultArr.push({
                status: 'success',
                path: finalName,
                fileName: fileArr[i].name,
                error: null
            });
            countSuccess++;
        } catch (err) {
            console.log('check error: ', err);
            resultArr.push({
                status: 'failed',
                path: null,
                fileName: fileArr[i].name,
                error: JSON.stringify(err)
            })
        }
    }
    return {
        countSuccess,
        detail: resultArr
    }
}

module.exports = {
    uploadSingleFile,
    uploadMultipleFile
}