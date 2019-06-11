import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
import loginService from './services/login'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
    it('if no user logged, login form is rendered', async () => {
        const component = render(
            <App />
        )

        await waitForElement(
            () => component.getByText('Log in')
        )

        const blogs = component.container.querySelectorAll('.Expandable')

        expect(blogs.length).toBe(0)
    })
})