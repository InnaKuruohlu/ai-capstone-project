import { z } from 'zod'

export const settingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  timezone: z.string().min(1, 'Select a timezone'),
  newsletter: z.boolean().optional(),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>

export function getTimezoneOptions(): string[] {
  if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl) {
    return Intl.supportedValuesOf('timeZone')
  }

  return ['UTC']
}

function getDefaultTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

export const defaultSettingsValues: SettingsFormValues = {
  name: '',
  email: '',
  timezone: getDefaultTimezone(),
  newsletter: false,
}
