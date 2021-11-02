import React, {useEffect, useState} from 'react';
import { Story } from '../components/Story';
import { getStoryIds } from '../services/hnApi'

export const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([])

  useEffect(() => {
    getStoryIds().then(data => setStoryIds(data));
  }, []);

  return (
    <>
    <h1>Latest stories:</h1>
    {storyIds.map(storyId => <Story key={storyId} storyId={storyId} />)}
    </>
  );
}