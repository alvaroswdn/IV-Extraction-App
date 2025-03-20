import { Footer, Header } from '@/components/layout'

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
