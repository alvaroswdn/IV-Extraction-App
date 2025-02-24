type Props = {
  color: string
  value: number
  children?: React.ReactNode
}

export default function ProgressRing({ color, value, children }: Props) {
  const offset = 100 - value

  return (
    <div className="relative size-full">
      <svg
        role="img"
        aria-label="progress ring"
        className="size-full rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current stroke-[0.6] text-neutral-300"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={`stroke-current stroke-1 ${color} transition-all duration-500 ease-in-out`}
          strokeDasharray="100"
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-center p-8">
        {children}
      </div>
    </div>
  )
}
