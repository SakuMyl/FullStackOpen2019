import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('SimpleBlog', () => {

    let component

    beforeEach(() => {

        const blog = {
            title: 'Test title',
            author: 'Test author',
            likes: 5
        }
    
        const mockHandler = jest.fn()
    
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
})