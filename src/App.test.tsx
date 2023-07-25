import React from 'react';
import App from './App';
import { expect } from '@jest/globals';
import {shallow, mount, configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from "axios";

configure({adapter: new Adapter()});
import {DeviceItem} from "./components/deviceItem";

beforeAll(() => {
  global.fetch = jest.fn();
});

let wrapper: { unmount: () => void; };
jest.mock('axios');

beforeEach(() => {
  wrapper = shallow(< App />, { disableLifecycleMethods: true });
});

afterEach(() => {
  wrapper.unmount();
});

it("Renders main device app", () => {
  shallow(<App />);
});

const devices = [{
  "deviceId"   : 1,
  "deviceName" : "Megapack 2XL",
  "dimension"  : "40FT x 10FT",
  "quantity"   : 0,
  "energy"     : 4,
  "cost"       : 120000,
  "date"       : 2022
}];

describe("", () => {
  it("Render the device Item component correctly", () => {
    const wrapper = mount(<DeviceItem devices={devices} totalEstimatedCost={100000} />);
    expect(wrapper.props().devices).toEqual(devices);
  });
});

it("renders Summary header", () => {
  const wrapper = shallow(<App />);
  const summary = <h1>HEADER</h1>;
  expect(wrapper.contains(summary)).toEqual(false);
});

it("includes two tr- one inside table for devices, 1 for header and 1 for totalCost", () => {
  const wrapper = shallow(<DeviceItem devices={devices} totalEstimatedCost={100000} />);
  expect(wrapper.find("tr").length).toEqual(3);
});


it('Mocking Axios get call for Device', () => {
    const mockResp = { devices };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(devices);
    axios.get("./device.json");
    expect(axios.get).toBeDefined();
    expect(axios.get).toHaveBeenCalledWith('./device.json');
    expect(axios.get).toBeCalledTimes(1);

});

it('Test click event & Snapshot testing', () => {
  const wrapper = shallow(<DeviceItem devices={devices} totalEstimatedCost={100000} />);
  const findButton = wrapper.find('button#add');
  const mockCallBack = jest.fn();
  findButton.simulate('click');
  expect(mockCallBack).toMatchSnapshot();
});



