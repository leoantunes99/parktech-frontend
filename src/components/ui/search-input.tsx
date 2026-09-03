import * as React from "react"
import { cn } from "../../lib/utils"
import { Label } from "./label"
import { Search } from "lucide-react";

interface SearchInputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

function SearchInput({ className, containerClassName, type, label, error, ...props }: SearchInputProps) {
  return (
    <div className={cn("w-full flex flex-col gap-1", containerClassName)}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div>
        <Search className="absolute size-4 text-gray-500 ml-3 mt-3"/>
        <input
          type={type}
          data-slot="input"
          className={cn(
            "h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-4 pl-10 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/50",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
  )
}

export { SearchInput }
