/* eslint-disable import/no-extraneous-dependencies */

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

process.env.LMS_BASE_URL = 'http://localhost:18000';
