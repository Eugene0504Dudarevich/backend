type FieldError = {
  field: string
  message: string
}

export const fieldError = (field: string, message: string): FieldError => {
  return { field, message }
}
