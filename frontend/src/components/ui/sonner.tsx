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
            "!bg-green-50 dark:!bg-green-900/20 !text-green-900 dark:!text-green-100 !border-green-200 dark:!border-green-700",
          error:
            "!bg-red-50 dark:!bg-red-900/20 !text-red-900 dark:!text-red-100 !border-red-200 dark:!border-red-700",
          description: "text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
