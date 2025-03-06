import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  )
}
