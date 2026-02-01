"use client"

import { useRouter } from "next/navigation"
import Button from "@/components/ui/Button"

type TRetryButton = {
  label?: string
  className?: string
}

const RetryButton = ({ label = "Retry", className }: TRetryButton) => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.refresh()}
      className={className}
      variant="secondary"
    >
      {label}
    </Button>
  )
}

export default RetryButton
