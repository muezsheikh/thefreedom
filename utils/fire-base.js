import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  projectId: 'thefreedom-38e04',
  storageBucket: 'thefreedom-38e04.appspot.com',
}

const apps = initializeApp(firebaseConfig)

export const storages = getStorage(apps)
