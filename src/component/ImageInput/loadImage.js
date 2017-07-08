export const isFileAcceptable = file => true

export const loadImage = (file, type: 'binary' | 'dataurl') =>
    new Promise((resolve, reject) => {
        const rf = new FileReader()

        rf.onerror = err => reject(err)
        rf.onload = () => resolve(rf.result)

        switch (type) {
            case 'binary':
                rf.readAsBinaryString(file)
                break

            case 'dataUrl':
                rf.readAsDataURL(file)
                break
        }
    })
