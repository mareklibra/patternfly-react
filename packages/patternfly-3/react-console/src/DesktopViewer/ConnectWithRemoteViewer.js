import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

import { VNCCONSOLE_TYPE, SPICECONSOLE_TYPE } from './constants';

import MoreInformation from './MoreInformation';
import MoreInformationContent from './MoreInformationContent';
import { generateVVFile, downloadFile } from './vvFileGenerator';
import consoleDetailPropType from './consoleDetailPropType';

const ConnectWithRemoteViewer = ({
  children,
  onGenerate,
  onDownload,
  spice,
  vnc,
  textConnectWithRemoteViewer,
  textMoreInfo
}) => {
  const console = spice || vnc; // strictly prefer spice over vnc
  const onClick = () => {
    const type = spice ? SPICECONSOLE_TYPE : VNCCONSOLE_TYPE;
    if (console) {
      const vv = onGenerate({ console, type });
      onDownload(vv.fileName || 'console.vv', vv.content, vv.mimeType || 'application/x-virt-viewer');
    }
  };

  return (
    <div className="remote-viewer">
      <div className="remote-viewer-launch">
        <Button bsSize="large" onClick={onClick} disabled={!console}>
          {textConnectWithRemoteViewer}
        </Button>
      </div>
      {!!console && (
        <MoreInformation textMoreInfo={textMoreInfo}>{children || <MoreInformationContent />}</MoreInformation>
      )}
    </div>
  );
};

ConnectWithRemoteViewer.propTypes = {
  children: PropTypes.any,

  spice: consoleDetailPropType,
  vnc: consoleDetailPropType,

  onGenerate: PropTypes.func,
  onDownload: PropTypes.func,

  textConnectWithRemoteViewer: PropTypes.string.isRequired,
  textMoreInfo: PropTypes.string.isRequired
};

ConnectWithRemoteViewer.defaultProps = {
  children: null /** Custom content of more-info section  */,

  spice: null,
  vnc: null,

  /** Generate content of .vv file.
   * Return an object of following format:
   * {
   *   content,  // required string value
   *   mimeType, // optional, default application/x-virt-viewer
   *   fileName  // optional, default: console.vv
   * }
   */
  onGenerate: generateVVFile,

  /** Perform file download.
   * Usually default implementation is good enough, but i.e. in case of environment with tight
   * content security policy set, this might be required.
   *
   * Examples for alternative file-download implementations:
   *   - use of iframe
   *   - use of http-server
   */
  onDownload: downloadFile
};

export default ConnectWithRemoteViewer;
