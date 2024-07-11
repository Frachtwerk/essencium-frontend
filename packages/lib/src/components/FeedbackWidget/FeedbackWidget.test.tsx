/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { AppShell, MantineProvider } from '@mantine/core'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { FeedbackWidget } from './FeedbackWidget'

vi.mock('@mantine/core', async () => {
  const mantineCore = (await vi.importActual('@mantine/core')) as Record<
    string,
    unknown
  >

  return {
    ...mantineCore,
    useMantineTheme: () => ({
      colors: { gray: [] },
    }),
  }
})

const mockedProps = {
  spyFunctions: {
    createFeedback: vi.fn(),
  },
  createNotification: () => {},
  user: {
    id: '12345',
    email: 'devnull@frachtwerk.de',
    firstName: 'Admin',
    lastName: 'User',
    locale: 'de',
    roles: [
      {
        name: 'USER',
        description: 'User',
        defaultRole: true,
        editable: false,
        protected: true,
        rights: [],
      },
      {
        name: 'ADMIN',
        description: 'Administrator',
        defaultRole: true,
        editable: false,
        protected: true,
        rights: [],
      },
    ],
    source: 'local',
    enabled: true,
    mobile: '88889999',
    phone: '11111111',
  },
}

describe('FeedbackWidget', () => {
  beforeAll(() => {
    vi.mock('next/router', () => ({
      useRouter: () => ({
        router: vi.fn(),
      }),
    }))
  })

  it('should render the button to open the feedback widget', () => {
    const component = render(
      <MantineProvider>
        <AppShell>
          <FeedbackWidget
            currentUser={mockedProps.user}
            createFeedback={mockedProps.spyFunctions.createFeedback}
            feedbackCreated={false}
            feedbackFailed={false}
            feedbackSending={false}
            createNotification={mockedProps.createNotification}
          />
        </AppShell>
      </MantineProvider>,
    )

    const openButton = screen.getByLabelText(
      'feedbackWidget.openButton.ariaLabel',
    )

    expect(openButton).toBeDefined()

    fireEvent.click(openButton)

    expect(screen.getByText('feedbackWidget.title')).toBeDefined()

    expect(
      screen.getAllByRole('button', { name: 'feedbackWidget.issue' })[0],
    ).toBeDefined()

    expect(
      screen.getAllByRole('button', { name: 'feedbackWidget.idea' })[0],
    ).toBeDefined()

    expect(
      screen.getAllByRole('button', { name: 'feedbackWidget.other' })[0],
    ).toBeDefined()

    component.unmount()
  })

  it('should render the feedback form after clicking the issue button', async () => {
    const component = render(
      <MantineProvider>
        <AppShell>
          <FeedbackWidget
            currentUser={mockedProps.user}
            createFeedback={mockedProps.spyFunctions.createFeedback}
            feedbackCreated={false}
            feedbackFailed={false}
            feedbackSending={false}
            createNotification={mockedProps.createNotification}
          />
        </AppShell>
      </MantineProvider>,
    )

    const openButton = screen.getByLabelText(
      'feedbackWidget.openButton.ariaLabel',
    )

    expect(openButton).toBeDefined()

    fireEvent.click(openButton)

    const issueButton = screen.getAllByRole('button', {
      name: '',
    })[1]

    fireEvent.click(issueButton)

    const textArea = (await screen.findByPlaceholderText(
      'feedbackWidget.placeholder',
    )) as HTMLTextAreaElement

    expect(textArea).toBeDefined()

    fireEvent.change(textArea, { target: { value: 'DummyText' } })

    expect(textArea.value).toBe('DummyText')

    const submitButton = await screen.findByRole('button', {
      name: 'feedbackWidget.button',
    })

    expect(submitButton).toBeDefined()

    const screenshotButton = await screen.findByRole('button', {
      name: 'feedbackWidget.screenshot.label',
    })

    expect(screenshotButton).toBeDefined()

    component.unmount()
  })

  it('should render the success message after submitting the feedback', async () => {
    const renderedComponent = render(
      <MantineProvider>
        <AppShell>
          <FeedbackWidget
            currentUser={mockedProps.user}
            createFeedback={mockedProps.spyFunctions.createFeedback}
            feedbackCreated
            feedbackFailed={false}
            feedbackSending={false}
            createNotification={mockedProps.createNotification}
          />
        </AppShell>
      </MantineProvider>,
    )

    const openButton = screen.getByLabelText(
      'feedbackWidget.openButton.ariaLabel',
    )

    expect(openButton).toBeDefined()

    fireEvent.click(openButton)

    const issueButton = screen.getAllByRole('button', {
      name: '',
    })[1]

    fireEvent.click(issueButton)

    expect(
      await screen.findByText('feedbackWidget.successMessage'),
    ).toBeDefined()

    renderedComponent.unmount()
  })

  it('should render the error message after not submitting the feedback', async () => {
    const renderedComponent = render(
      <MantineProvider>
        <AppShell>
          <FeedbackWidget
            currentUser={mockedProps.user}
            createFeedback={mockedProps.spyFunctions.createFeedback}
            feedbackCreated={false}
            feedbackFailed
            feedbackSending={false}
            createNotification={mockedProps.createNotification}
          />
        </AppShell>
      </MantineProvider>,
    )

    const openButton = screen.getByLabelText(
      'feedbackWidget.openButton.ariaLabel',
    )

    expect(openButton).toBeDefined()

    fireEvent.click(openButton)

    const issueButton = screen.getAllByRole('button', {
      name: '',
    })[1]

    fireEvent.click(issueButton)

    expect(await screen.findByText('feedbackWidget.errorMessage')).toBeDefined()

    renderedComponent.unmount()
  })
})
