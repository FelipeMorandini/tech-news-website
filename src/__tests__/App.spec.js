import React from "react";
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitFor } from '@testing-library/react';
import { App } from '../App';
import { storyIds, singularStory } from '../fixtures';
import { getStory, getStoryIds } from '../services/hnApi';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { STORY_INCREMENT } from "../constants";

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');

jest.mock('../services/hnAPI', () => ({
    getStory: jest.fn(),
    getStoryIds: jest.fn(),
}));

test('renders the application', async () => {
    useInfiniteScroll.mockImplementation(() => ({
        count: STORY_INCREMENT,
    }));
    getStory.mockImplementation(() => Promise.resolve(singularStory));
    getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

    await act(async () => {
        const { getByText, queryByTestId } = render(<App />)
        await waitFor(() => [
            expect(getByText('Latest stories:')).toBeTruthy(),
            expect(getByText('Dippity Dappity, Dibidabbydippity!')).toBeTruthy(),
            expect(queryByTestId('story-by').textContent).toEqual('By: Felipe Pires Morandini'),
        ]);
    });
})