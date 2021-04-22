import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { JSDOM } from 'jsdom';

configure({ adapter: new Adapter() });

// Make enzyme func's global!
global.shallow = shallow;
global.mount = mount;
global.render = render;

// Mock document
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
