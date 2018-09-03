import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'patternfly-react';

import ManualConnection from './ManualConnection';
import ConnectWithRemoteViewer from './ConnectWithRemoteViewer';
import consoleDetailPropType from './consoleDetailPropType';

const DesktopViewer = ({ children, spice, vnc, onGenerate, onDownload, ...props }) => (
  <Grid fluid className="desktop-viewer">
    <Row>
      <Col md={6}>
        <ConnectWithRemoteViewer spice={spice} vnc={vnc} onGenerate={onGenerate} onDownload={onDownload} {...props}>
          {children}
        </ConnectWithRemoteViewer>
      </Col>
      <Col md={6}>
        <ManualConnection spice={spice} vnc={vnc} {...props} />
      </Col>
    </Row>
  </Grid>
);

DesktopViewer.propTypes = {
  children: PropTypes.any,

  spice: consoleDetailPropType,
  vnc: consoleDetailPropType,

  onGenerate: PropTypes.func,
  onDownload: PropTypes.func,

  textManualConnection: PropTypes.string /** Internationalization */,
  textSpice: PropTypes.string,
  textVNC: PropTypes.string,
  textNoProtocol: PropTypes.string,
  textConnectWith: PropTypes.string,

  textAddress: PropTypes.string,
  textSpiceAddress: PropTypes.string,
  textVNCAddress: PropTypes.string,
  textSpicePort: PropTypes.string,
  textVNCPort: PropTypes.string,
  textSpiceTlsPort: PropTypes.string,
  textVNCTlsPort: PropTypes.string,

  textConnectWithRemoteViewer: PropTypes.string,
  textMoreInfo: PropTypes.string
};

DesktopViewer.defaultProps = {
  children: null /** Custom content of more-info section  */,

  spice: null /** Optional. Connection details for spice */,
  vnc: null /** Optional. Connection details for vnc */,

  onGenerate: undefined /** See ConnectWithRemoteViewer.defaultProps for more info */,
  onDownload: undefined /** See ConnectWithRemoteViewer.defaultProps for more info */,

  textManualConnection: 'Manual Connection',
  textSpice: 'Spice',
  textVNC: 'VNC',
  textNoProtocol: 'No connection available.',
  textConnectWith: 'Connect with any viewer application for following protocols:',

  textAddress: 'Address:',
  textSpiceAddress: 'SPICE Address:',
  textVNCAddress: 'VNC Address:',
  textSpicePort: 'SPICE Port:',
  textVNCPort: 'VNC Port:',
  textSpiceTlsPort: 'SPICE TLS Port:',
  textVNCTlsPort: 'VNC TLS Port:',

  textConnectWithRemoteViewer: 'Launch Remote Viewer',
  textMoreInfo: 'More Information'
};

export default DesktopViewer;
