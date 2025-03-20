import { HeartIcon } from 'lucide-react'

import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <HeartIcon className="size-4" />
            </div>
            Eco-IV
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center pb-12">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div
        className="relative hidden lg:block"
        style={{
          backgroundImage:
            'radial-gradient(circle at 83% 22%, hsla(35.735294117647136, 82%, 87%, 1) 0%, transparent 50%), radial-gradient(circle at 0% 50%, hsla(194.5588235294118, 37%, 91%, 1) 0%, transparent 50%), radial-gradient(circle at 21% 21%, hsla(27.999999999999577, 0%, 86%, 1) 0%, transparent 50%), radial-gradient(circle at 54% 77%, hsla(193.2352941176474, 100%, 95%, 1) 0%, transparent 50%), radial-gradient(circle at 30% 75%, hsla(197.87234042553195, 25%, 35%, 1) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}
