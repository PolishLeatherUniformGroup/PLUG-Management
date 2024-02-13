'use client'

import { Button, ButtonProps } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ text, size, color }: {
    text: string,
    size: "sm" | "md" | "lg" | undefined,
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
}): JSX.Element {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" color={color} size={size} aria-disabled={pending} isDisabled={pending} isLoading={pending}>
            {text}
        </Button>
    )
}