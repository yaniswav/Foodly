export function useToast() {
    return {
        toast: ({ title, description }: { title: string; description?: string }) => {
            alert(`${title}\n${description || ""}`)
        },
    }
}
