import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Make func's global!
global.render = render;
global.fireEvent = fireEvent;
global.userEvent = userEvent;
