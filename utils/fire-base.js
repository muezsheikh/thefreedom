import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
}

const apps = initializeApp(firebaseConfig)

export const storages = getStorage(apps)
