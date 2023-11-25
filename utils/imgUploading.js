import { storages } from '@/utils/fire-base'

import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

export const imgUploadingFunc = (uploadImg) => {
  if (uploadImg === null) return
  const imageRef = ref(storages, `/images/${uploadImg.name + v4()} `)
  uploadBytes(imageRef, uploadImg).then(()=>{
    alert('image uploaded')
  })
}
