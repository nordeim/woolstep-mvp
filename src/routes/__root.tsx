import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@components/layout/Navbar'
import { Footer } from '@components/layout/Footer'
import { ToastContainer } from '@components/ToastContainer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px]">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}
