// import { auth } from '@/auth'
// import Image from 'next/image'

// export default async function Profile() {
//   const session = await auth()

//   if (!session?.user) return null

//   return (
//     <div>
//       <h1>{session.user.name}</h1>
//       {session.user.image && session.user.name && (
//         <Image src={session.user.image} alt={session.user.name} width={100} height={100} />
//       )}
//     </div>
//   )
// }
