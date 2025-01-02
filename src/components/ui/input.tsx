import { cn } from "@/utils"
import * as React from "react"
// 为组件的 props 明确指定类型
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,icon,iconRight, ...props }, ref) => {
    return (
        <div className="relative w-full">
            {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {icon}
                </div>
            )}
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 disabled:cursor-not-allowed disabled:opacity-50",
                    icon ? "pl-10" : "pl-3",
                    className
                )}
                ref={ref}
                {...props}
            />
          {iconRight && (
            <div className="absolute right-[13px] top-1/2 transform -translate-y-1/2 bg-white">
              {iconRight}
            </div>
          )}
        </div>
    )
  }
)
Input.displayName = "Input"

export {Input}
