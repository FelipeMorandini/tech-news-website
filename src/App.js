import React, {useEffect, useState} from 'react';
import { getStoryIds } from './services/hnApi'
import { StoriesContainer } from './containers/StoriesContainer';

export const App = () => <StoriesContainer />