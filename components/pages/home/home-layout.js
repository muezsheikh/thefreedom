import React, { useEffect, useState } from 'react'
import HeroSection from './hero-section'
import Section2 from './section2'
import Section3 from './section3'
import PageLayout from '../page-layout'
import axios from 'axios'
import HeroLoader from './hero-loader'

export default function HomeLayout() {
  return (
    <>
      <HeroSection />
      <PageLayout>
        <Section3 />
      </PageLayout>
    </>
  )
}
