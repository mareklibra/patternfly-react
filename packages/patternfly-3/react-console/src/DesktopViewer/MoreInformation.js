import React from 'react';
import PropTypes from 'prop-types';

class MoreInformation extends React.Component {
  state = { expanded: false };

  onClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  render() {
    return (
      <div>
        <div className="remote-viewer-more-info">
          <a href="#" tabIndex="0" onClick={this.onClick}>
            {this.state.expanded ? <span className="fa fa-angle-down" /> : <span className="fa fa-angle-right" />}
            &nbsp; {this.props.textMoreInfo}
          </a>
        </div>
        {this.state.expanded && this.props.children}
      </div>
    );
  }
}

MoreInformation.propTypes = {
  children: PropTypes.any.isRequired,

  textMoreInfo: PropTypes.string
};

MoreInformation.defaultProps = {
  textMoreInfo: 'More Information'
};

export default MoreInformation;
