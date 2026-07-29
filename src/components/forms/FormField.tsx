import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type FormFieldProps = {
  id: string
  label: string
  error?: FieldError
  children: ReactNode
}

function FormField({ id, label, error, children }: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={errorId} className="form-field__error" role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  error?: FieldError
}

export function TextInput({ id, label, error, ...inputProps }: TextInputProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <FormField id={id} label={label} error={error}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...inputProps}
      />
    </FormField>
  )
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label: string
  error?: FieldError
  options: { value: string; label: string }[]
}

export function SelectInput({
  id,
  label,
  error,
  options,
  ...selectProps
}: SelectInputProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <FormField id={id} label={label} error={error}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}

type CheckboxInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  error?: FieldError
}

export function CheckboxInput({ id, label, error, ...inputProps }: CheckboxInputProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="form-checkbox">
      <input
        id={id}
        type="checkbox"
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...inputProps}
      />
      <label htmlFor={id}>{label}</label>
      {error && (
        <p id={errorId} className="form-field__error" role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
}
