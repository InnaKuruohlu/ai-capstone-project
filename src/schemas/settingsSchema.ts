import { z } from 'zod'

export const settingsSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, 'Display name must be at least 2 characters')
      .max(50, 'Display name must be 50 characters or fewer'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),
    bio: z
      .string()
      .trim()
      .max(200, 'Bio must be 200 characters or fewer')
      .optional()
      .or(z.literal('')),
    theme: z.enum(['light', 'dark', 'system'], {
      required_error: 'Select a theme',
    }),
    notifications: z.object({
      email: z.boolean(),
      push: z.boolean(),
      marketing: z.boolean(),
    }),
    language: z.enum(['en', 'es', 'fr', 'de'], {
      required_error: 'Select a language',
    }),
    timezone: z.string().min(1, 'Select a timezone'),
    currentPassword: z.string().optional().or(z.literal('')),
    newPassword: z.string().optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const wantsPasswordChange =
      Boolean(data.currentPassword) ||
      Boolean(data.newPassword) ||
      Boolean(data.confirmPassword)

    if (!wantsPasswordChange) return

    if (!data.currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Current password is required to change password',
        path: ['currentPassword'],
      })
    }

    if (!data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password is required',
        path: ['newPassword'],
      })
    } else if (data.newPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password must be at least 8 characters',
        path: ['newPassword'],
      })
    } else if (!/[A-Z]/.test(data.newPassword)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password must include an uppercase letter',
        path: ['newPassword'],
      })
    } else if (!/[0-9]/.test(data.newPassword)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password must include a number',
        path: ['newPassword'],
      })
    }

    if (!data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Confirm your new password',
        path: ['confirmPassword'],
      })
    } else if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export type SettingsFormValues = z.infer<typeof settingsSchema>

export const defaultSettingsValues: SettingsFormValues = {
  displayName: '',
  email: '',
  bio: '',
  theme: 'system',
  notifications: {
    email: true,
    push: false,
    marketing: false,
  },
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export const timezoneOptions = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
]
