export default function getS3Requester(s3) {
  // option {
  //  onProgress: (event: { percent: number }): void,
  //  onError: (event: Error, body?: Object): void,
  //  onSuccess: (body: Object): void,
  //  data: Object,
  //  filename: String,
  //  file: File,
  //  withCredentials: Boolean,
  //  action: String,
  //  headers: Object,
  // }
  return function request(option) {
    const { filename, file, action } = option
    const key = ('file' !== filename) ? filename : `${Math.random().toString(36).substr(2, 5)}-${file.name}`
    const upload = s3.upload({ Key: key, Body: file, ContentType: file.type, Bucket: action })
      .on('httpUploadProgress', (progress) => {
        const percent = parseInt((progress.loaded * 100) / progress.total, 10)
        option.onProgress({percent: percent}, {name: progress.key})
      })

    upload.send((err, data) => {
      if (!err) {
        option.onSuccess(data, {name: data.Key})
      } else {
        option.onError(err)
      }
    })

    return {
      abort() {
        upload.abort()
      },
    }
  }
}