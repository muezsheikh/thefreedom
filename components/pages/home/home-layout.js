import React from 'react'
import HeroSection from './hero-section'
import Section2 from './Section2'
import Section3 from './Section3'
import PageLayout from './PageLayout'

export default function HomeLayout() {
  return (
    <>

      <HeroSection />
      <PageLayout>
        <Section2 />
        <Section3 />
        <Section2 />
        <Section3 />
      </PageLayout>
    </>
  )
}
