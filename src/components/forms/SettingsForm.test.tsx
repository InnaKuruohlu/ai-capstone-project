import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SettingsForm } from './SettingsForm'

const mockTimezones = ['UTC', 'America/New_York']

beforeEach(() => {
  vi.spyOn(Intl, 'supportedValuesOf').mockReturnValue(mockTimezones)
})

describe('SettingsForm', () => {
  it('submits valid data and shows a success message', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    const submitButton = screen.getByRole('button', { name: /save settings/i })
    expect(submitButton).toBeDisabled()

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.selectOptions(screen.getByLabelText(/timezone/i), 'UTC')
    await user.tab()

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    await user.click(submitButton)

    expect(await screen.findByRole('status')).toHaveTextContent('Settings saved successfully.')
  })

  it('shows an error for an invalid email format on blur', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'not-an-email')
    await user.tab()

    expect(await screen.findByText('Enter a valid email address')).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
    expect(emailInput).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows an error when a required field is left empty on blur', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    const nameInput = screen.getByLabelText(/name/i)
    await user.click(nameInput)
    await user.tab()

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(nameInput).toHaveAttribute('aria-describedby', 'name-error')
    expect(nameInput).toHaveAttribute('aria-invalid', 'true')
  })

  it('toggles the newsletter checkbox', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    const newsletterCheckbox = screen.getByLabelText(/subscribe to newsletter/i)
    expect(newsletterCheckbox).not.toBeChecked()

    await user.click(newsletterCheckbox)
    expect(newsletterCheckbox).toBeChecked()

    await user.click(newsletterCheckbox)
    expect(newsletterCheckbox).not.toBeChecked()
  })
})
