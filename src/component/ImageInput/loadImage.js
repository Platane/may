export const isFileAcceptable = (file: File) => true

export const loadImage = (file: File, type: 'binary' | 'dataUrl') =>
    new Promise((resolve, reject) => {
        const rf = new FileReader()

        rf.onerror = err => reject(err)
        rf.onload = () => resolve(rf.result)

        switch (type) {
            case 'binary':
                rf.readAsArrayBuffer(file)
                break

            case 'dataUrl':
                rf.readAsDataURL(file)
                break
        }
    })
