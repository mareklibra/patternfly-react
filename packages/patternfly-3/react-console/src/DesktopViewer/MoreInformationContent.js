import React from 'react';
import PropTypes from 'prop-types';

const MoreInformationInstallVariant = ({ os, content }) => (
  <li>
    <div className="more-information-install">
      <b>{os}:</b>
      {content}
    </div>
  </li>
);
MoreInformationInstallVariant.propTypes = {
  os: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

const MoreInformationContent = () => {
  const windowsInner = (
    <div>
      Download the MSI from{' '}
      <a href="https://virt-manager.org/download/" target="_blank" rel="noopener noreferrer">
        virt-manager.org
      </a>
    </div>
  );

  return (
    <div>
      <p>
        Clicking &quot;Launch Remote Viewer&quot; will download a .vv file and launch <i>Remote Viewer</i>
      </p>
      <p>
        <i>Remote Viewer</i> is available for most operating systems. To install it, search for it in GNOME Software or
        run the following:
      </p>

      <ul>
        <MoreInformationInstallVariant os="RHEL, CentOS" content="sudo yum install virt-viewer" />
        <MoreInformationInstallVariant os="Fedora" content="sudo dnf install virt-viewer" />
        <MoreInformationInstallVariant os="Ubuntu, Debian" content="sudo apt-get install virt-viewer" />
        <MoreInformationInstallVariant os="Windows" content={windowsInner} />
      </ul>
    </div>
  );
};

export default MoreInformationContent;
