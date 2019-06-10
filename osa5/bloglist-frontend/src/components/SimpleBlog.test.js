import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('SimpleBlog', () => {

    let component

    let mockHandler
    
    beforeEach(() => {

        const blog = {
            title: 'Test title',
            author: 'Test author',
            likes: 5
        }
    
        mockHandler = jest.fn()
    
        component = render (
            <SimpleBlog blog={blog} onClick={mockHandler}/>
        )    
    })

    it('renders blog title and author', () => {

        const div = component.container.querySelector('.header')
        expect(div).toHaveTextContent('Test title Test author')

        const secondDiv = component.container.querySelector('.likes')
        expect(secondDiv).toHaveTextContent('blog has 5 likes')
        
    })

    it('correct number of button clicks are registered in event handler', () => {

        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})