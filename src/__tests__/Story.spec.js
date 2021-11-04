import React from "react";
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitFor } from '@testing-library/react';
import { Story } from '../components/Story';
import { singularStory } from '../fixtures';
import { getStory } from '../services/hnApi';


beforeEach(() => {
    cleanup()
});

jest.mock('../services/hnAPI', () => ({
    getStory: jest.fn(),
}));

test('renders the story component with content', async () => {
    getStory.mockImplementation(() => Promise.resolve(singularStory));

    await act(async () => {
        const { getByText, queryByTestId } = render(<Story storyId="1" />)
        await waitFor(() => [
            expect(queryByTestId('story')).toBeTruthy(),
            expect(getByText('Dippity Dappity, Dibidabbydippity!')).toBeTruthy(),
            expect(queryByTestId('story-by').textContent).toEqual('By: Felipe Pires Morandini'),
        ]);
    });
})