"use client"

import ErrorState from "@/components/ui/ErrorState"
import Button from "@/components/ui/Button"

type TAppError = {
  error: Error & { digest?: string }
  reset: () => void
}

const AppError = ({ error, reset }: TAppError) => {
  return (
    <main className="space-y-8">
      <ErrorState
        title="Something went wrong"
        description={error.message || "An unexpected error occurred."}
        action={(
          <Button onClick={() => reset()} variant="secondary">
            Retry
          </Button>
        )}
      />
    </main>
  )
}

export default AppError
