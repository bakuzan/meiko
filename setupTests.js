import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Make enzyme func's global!
global.shallow = shallow;
global.mount = mount;
global.render = render;
