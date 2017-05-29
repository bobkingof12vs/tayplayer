import React from 'react';
import { render } from 'react-dom';
import { Main } from './Components/main';

render(
  <Main />,
  document.getElementById('app')
);

//known issues:
//window resizing isn't handled verywell
//quick fit causes spaces (probably due to rounding), doesn't use whole window, can make windows smaller than mins
