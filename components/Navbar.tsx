import Image from "next/image"
import Link from "next/link"


const Navbar = () => {
  return (
    <header>
      <nav>
         <Link href='/' className="logo">
         <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
         <p>DevEvent</p>
         </Link>
         <ul>
            <Link href='/' className="logo">Home</Link>
            <Link href='/' className="logo">Events</Link>
            <Link href='/' className="logo">Create Event</Link>
         </ul>
      </nav>
    </header>
  )
}

export default Navbar