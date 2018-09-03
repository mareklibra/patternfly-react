/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, mount } from 'enzyme';

import DesktopViewer from './DesktopViewer';
import MoreInformationContent from './MoreInformationContent';
import { generateVVFile } from './vvFileGenerator';
import { SPICECONSOLE_TYPE } from './constants';

const spice = {
  address: 'my.host.com',
  port: 5900,
  tlsPort: '5901'
};
const vnc = {
  address: 'my.host.com',
  port: 5902,
  tlsPort: '5903'
};

test('DesktopViewer empty', () => {
  const wrapper = render(<DesktopViewer />);
  expect(wrapper).toMatchSnapshot();
});

test('DesktopViewer with Spice and VNC', () => {
  const wrapper = render(<DesktopViewer spice={spice} vnc={vnc} />);
  expect(wrapper).toMatchSnapshot();
});

test('DesktopViewer launch button', () => {
  const onDownload = jest.fn();
  const onGenerate = jest.fn().mockReturnValue({ content: 'Foo' });
  const wrapper = mount(<DesktopViewer spice={spice} vnc={vnc} onDownload={onDownload} onGenerate={onGenerate} />);
  const launchButton = wrapper.find('button');
  expect(launchButton).toHaveLength(1);
  launchButton.simulate('click');
  expect(onGenerate).toHaveBeenCalledTimes(1);
  expect(onDownload).toHaveBeenCalledTimes(1);
});

test('DesktopViewer with custom more-info content', () => {
  const wrapper = mount(
    <DesktopViewer spice={spice} vnc={vnc}>
      <p id="custom-more-info">My more-info content</p>
    </DesktopViewer>
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('#custom-more-info')).toHaveLength(0);
  const linkMoreInfo = wrapper.find('.remote-viewer-more-info > a');
  expect(linkMoreInfo).toHaveLength(1);
  linkMoreInfo.simulate('click');
  expect(wrapper.find('#custom-more-info')).toHaveLength(1);
});

test('default MoreInformationContent', () => {
  const wrapper = render(<MoreInformationContent />);
  expect(wrapper).toMatchSnapshot();
});

test('default implementation of generateVVFile()', () => {
  const output = generateVVFile({ console: spice, type: SPICECONSOLE_TYPE });
  expect(output.mimeType).toMatch('application/x-virt-viewer');
  expect(output.content).toMatch(
    '[virt-viewer]\ntype=spice\nhost=my.host.com\nport=5900\ndelete-this-file=1\nfullscreen=0\n'
  );
});
