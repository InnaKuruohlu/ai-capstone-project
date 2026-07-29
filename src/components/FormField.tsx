import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type FormFieldProps = {
  id: string
  label: string
  error?: FieldError
  hint?: string
  children: ReactNode
}

export function FormField({ id, label, error, hint, children }: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <div className={`form-field${error ? ' form-field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      )}
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
  hint?: string
}

export function TextInput({ id, label, error, hint, ...inputProps }: TextInputProps) {
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <FormField id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className="form-input"
        {...inputProps}
      />
    </FormField>
  )
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label: string
  error?: FieldError
  hint?: string
  options: { value: string; label: string }[]
}

export function SelectInput({
  id,
  label,
  error,
  hint,
  options,
  ...selectProps
}: SelectInputProps) {
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <FormField id={id} label={label} error={error} hint={hint}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className="form-input"
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

type CheckboxInputProps = {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  error?: FieldError
}

export function CheckboxInput({ id, label, checked, onChange, error }: CheckboxInputProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={`form-checkbox${error ? ' form-field--error' : ''}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
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
