'use client'

import { AppProgressProvider as ProgressProvider } from '@bprogress/next'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider height="3px" color="#3d5a80" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  )
}

export default Providers
