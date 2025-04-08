"use client"

import * as React from "react"
import { Switch as HeadlessSwitch } from "@headlessui/react"
import { cn } from "@/lib/utils"

type SwitchProps = {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    id?: string
}

export const Switch = ({ checked, onCheckedChange, id }: SwitchProps) => {
    return (
        <HeadlessSwitch
            checked={checked}
            onChange={onCheckedChange}
            className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full",
                checked ? "bg-black" : "bg-gray-300"
            )}
            id={id}
        >
      <span
          className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition",
              checked ? "translate-x-6" : "translate-x-1"
          )}
      />
        </HeadlessSwitch>
    )
}
