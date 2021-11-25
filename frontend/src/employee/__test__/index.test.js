import React from 'react'
import Employee from '../index'
import { ImgContext } from '../../contexts/ImgContext'

import { render, screen } from '@testing-library/react'

describe("Employee", () => {
    beforeEach(() => {
        render(
            <ImgContext.Provider value={''}>
                <Employee id='' bio='' avatar='' company='' name='' title="Reward Gateway" />
            </ImgContext.Provider>
        );
    });

    test('renders props properly', async () => {
        const titleElement = screen.getByText(/Reward Gateway/i)
        expect(titleElement).toBeInTheDocument();
    });

    test('renders props properly', async () => {
        const titleElement = screen.getByTestId('test-title')
        expect(titleElement).toBeInTheDocument();
    });

    test('renders proper element', async () => {
        const titleElement = screen.getByTestId('test-title')
        expect(titleElement).toContainHTML('p');
    });

    test('renders props with proper value', async () => {
        const titleElement = screen.getByTestId('test-title')
        expect(titleElement.textContent).toBe('Reward Gateway');
    });
})



