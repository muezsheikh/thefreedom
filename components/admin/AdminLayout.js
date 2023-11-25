import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import NewPost from './NewPost'
import Link from 'next/link'
import AllPosts from './AllPosts'
import Comments from './Comments'
import { useRouter } from 'next/router'
import Messages from './Messages'

export default function AdminLayout() {
  const router = useRouter()
  const [tab, setTab] = useState('new-post')
  const getTab = (tabName) => {
    setTab(tabName)
    router.push(`admin/?=${tabName}`)

  }
  return (
    <div>
      <Link href={'/'}>
        <div className='main-logo'>
          <img
            src='https://thefreedom.com.pk/wp-content/uploads/2021/10/The-freedom-logoo.png'
            alt=''
          />
        </div>
      </Link>
      <AdminHeader getTab={getTab} tab={tab} />
      {tab === 'new-post' && <NewPost/>}
      {tab === 'all-posts' && <AllPosts/>}
      {tab === 'comments' && <Comments/>}
      {tab === 'messages' && <Messages/>}
    </div>
  )
}
