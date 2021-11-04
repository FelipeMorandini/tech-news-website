import axios from 'axios';
import { getStoryIds, getStory, newStoriesUrl, storyUrl } from '../services/hnApi';
import { singularStory, storyIds, emptySingularStory } from '../fixtures';

jest.mock('axios');

describe('HackerNews API', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getStory function', () => {
        it('requests and gets a story using the HackerNews API', async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: { ...singularStory } }));
            const entity = await getStory(1);
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
            expect(entity).toEqual(singularStory);
        });

        it('does not retrieve stories when using HackerNews API, but still handles the request with no issues', async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: emptySingularStory }));
            const entity = await getStory(1);
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
            expect(entity).toEqual(emptySingularStory);
        });
    });

    describe('getStoryIds', () => {
        it('requests and gets story IDs using the HackerNews API', async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: storyIds }));
            const entity = await getStoryIds();
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(newStoriesUrl);
            expect(entity).toEqual(storyIds);
        });
    })
})