import * as React from "react"
import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps): React.ReactElement => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "border shadow-lg",
          success:
            "bg-[var(--success-bg)] text-[var(--success)] border-[var(--success-border)]",
          error:
            "bg-[var(--destructive)]/10 text-[var(--destructive)] border-[var(--destructive)]",
          description: "text-[var(--muted-foreground)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
