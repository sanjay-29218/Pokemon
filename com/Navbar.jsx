import React from 'react'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
const Navbar = () => {
  const router = useRouter()
  return (
    <div className='p-5 sticky top-0 shadow-lg bg-slate-100 flex gap-10 items-center  '>
     <div>
      {router.pathname !== '/' && <Link href={'/'}><ArrowBackIcon/></Link>}
     </div>
            <Link href={'/'}>            <img  src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" className='h-10' alt="" />
</Link>
    </div>
  )
}

export default Navbar