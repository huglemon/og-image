'use client'
import { useRef, useState } from "react"
import { Cross2Icon, FileIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ImageSelector({
  id,
  onChange,
  initialFileName,
}: {
  id: string
  onChange: (v: string | undefined) => void
  initialFileName?: string
}) {
  const [fileName, setFileName] = useState(initialFileName || '')
  const [preview, setPreview] = useState('')
  const inputElement = useRef<HTMLInputElement>(null)

  function handleRemove() {
    setFileName('')
    onChange(undefined)
  }

  function handleSelect() {
    inputElement.current?.click()
  }

  const handleFileSelect = (file: File | null) => {
    if (!file) return
    
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        const imageData = e.target.result.toString()
        setPreview(imageData)
        onChange(imageData)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <input
        id={id}
        ref={inputElement}
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg, .svg"
        multiple={false}
        onChange={(e) => {
          if (!e.target.files) return

          const file = e.target.files[0]
          if (!file) return

          handleFileSelect(file)
        }}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="justify-start space-x-1 overflow-hidden"
          >
            <span>{fileName ? "File:" : "Choose Image:"}</span>
            <span className="overflow-hidden overflow-ellipsis font-mono font-normal">
              {fileName || "(No file chosen)"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{
            width: "var(--radix-dropdown-menu-trigger-width)",
          }}
        >
          <DropdownMenuItem onSelect={handleSelect}>
            <FileIcon className="mr-1 h-4 w-4" />
            <span>Select a file</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleRemove}>
            <Cross2Icon className="mr-1 h-4 w-4" />
            <span>Remove</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="Preview" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  )
}
