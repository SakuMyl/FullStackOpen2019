import React from 'react'
import 'jest-dom/extend-expect'
import { render,  waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
    it('only renders a login form is no user is logged in', async () => {
        const component = render(
            <App />
        )

        await waitForElement(
            () => component.getByText('Log in')
        )

        const blogs = component.container.querySelectorAll('.Expandable')

        expect(blogs.length).toBe(0)
    })

    it('renders blogs when a user is logged in', async () => {
        const user = {
            username: 'test',
            token: 'asdf1234567890',
            name: 'Teppo Tulppu'
        }
        localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

        const component = render(
            <App/>
        )

        await waitForElement(
            () => component.container.querySelector('.Expandable')
        )

        const blogs = component.container.querySelectorAll('.Expandable')
        expect(blogs.length).toBe(3)

        expect(component.container).toHaveTextContent("Go To Statement Considered Harmful")
        expect(component.container).toHaveTextContent("React patterns")
        expect(component.container).toHaveTextContent("Canonical string reduction")
    })
})