import React, { useState, useEffect } from 'react';
import { getStory } from '../services/hnApi';
import { StoryWrapper, StoryMeta, StoryTitle, StoryMetaElement } from '../styles/StoryStyles';

export const Story = ({ storyId }) => {
    const [story, setStory] = useState({})

    useEffect(() => {
        getStory(storyId).then(data => data && data.url && setStory(data));
    }, [storyId]);

    return story && story.url ? (
        <StoryWrapper data-testid="story">
        
        <StoryTitle>
            <a href={story.url}><p>{story.title}</p></a>
        </StoryTitle>

        <StoryMeta>
            <span className="story__by" data-testid="story-by">
                <StoryMetaElement>By:</StoryMetaElement> {story.by}
            </span>
            <br />
            <span className="story__time" data-testid="story-time">
                <StoryMetaElement>Posted:</StoryMetaElement> {story.time}
            </span>
        </StoryMeta>

        </StoryWrapper>
    ) : null;
};