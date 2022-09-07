import { render, screen } from '@testing-library/react';
import { JSDOM } from 'jsdom';

// Make func's global!
global.render = render;
global.screen = screen;

// Mock document
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
