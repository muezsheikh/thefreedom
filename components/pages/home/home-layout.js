import React from 'react'
import HeroSection from './hero-section'
import Section2 from './Section2'
import Section3 from './Section3'
import PageLayout from './PageLayout'
import Section4 from './Section4'
import Section5 from './Section5'

export default function HomeLayout() {
  return (
    <>

      <HeroSection />
      <PageLayout>
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </PageLayout>
    </>
  )
}
