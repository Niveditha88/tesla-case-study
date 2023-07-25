import React from 'react';
import App from './App';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
import {DeviceItem} from "./components/deviceItem";

beforeAll(() => {
  global.fetch = jest.fn();
});

let wrapper: { unmount: () => void; };
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
    expect(wrapper.props().devices).eq(devices);
  });
});

it("renders Summary header", () => {
  const wrapper = shallow(<App />);
  const summary = <h1>HEADER</h1>;
  expect(wrapper.contains(summary)).eq(false);
});

it("includes two tr- one inside table for devices, 1 for header and 1 for totalCost", () => {
  const wrapper = shallow(<DeviceItem devices={devices} totalEstimatedCost={100000} />);
  expect(wrapper.find("tr").length).eq(3);
});


