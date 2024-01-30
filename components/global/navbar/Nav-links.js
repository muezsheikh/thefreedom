import Link from 'next/link'

export default function NavLinks() {
  return (
    <nav>
      <div className="crossIcon">
      </div>
      <ul>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/'}>World</Link>
          <ul className="dropdown">
            <li><Link href={'/south-asia'}>South Asia</Link></li>
            <li><Link href={'/pakistan'}>Pakistan</Link></li>
            <li><Link href={'/middle-east'}>Middle East</Link></li>
          </ul>
        </li>
        <li><Link href={'/business'}>Business</Link>
        <ul className="dropdown">
          <li><Link href='crypto'>Crypto</Link></li>
        </ul>
        
        </li>
        <li><Link href={'/environment'}>Environment</Link></li>
        <li><Link href={'/health'}>Health</Link></li>
        <li><Link href={'/education'}>Education</Link></li>
        <li><Link href={'/visa-and-immigration'}>Visa and Immigration</Link></li>
        <li><Link href={'/fashion-and-style'}>Fashion & Style</Link></li>
        <li><Link href={'/sports'}>Sports</Link></li>
        <li><Link href={'/contact'}>Contact</Link></li>
        
      </ul>
    </nav>
  )
}
