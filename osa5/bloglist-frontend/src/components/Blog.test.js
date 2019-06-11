import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('Blog', () => {

    let component

    beforeEach(() => {

        const blog = {
            title: 'Test title',
            author: 'Test author',
            url: 'Testurl.com',
            user: {
                name: 'Testuser',
            }
        }

        component = render (
            <Blog blog={blog} like={jest.fn()} remove={jest.fn()} userOwns={false}/>
        )
    })

    it('shows only blog title and author in the beginning', () => {

        const hiddenContent = component.container.querySelector('.ExpandedContent')
        expect(hiddenContent).toHaveStyle('display:none')

        const expandableTitle = component.container.querySelector('.ExpandableTitle')

        fireEvent.click(expandableTitle)

        const blogAfterClick = component.container.querySelector('.ExpandedContent')
        expect(blogAfterClick).not.toHaveStyle('display: none')
    })
})