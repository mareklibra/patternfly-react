import React from 'react';
import { css } from '@patternfly/react-styles';
import styles from './navigation.styles';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import NavigationItemGroup from './navigationItemGroup';
import NavigationItem from './navigationItem';

const routeShape = PropTypes.shape({
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  pkg: PropTypes.string,
  components: PropTypes.array
});

const propTypes = {
  componentRoutes: PropTypes.arrayOf(routeShape),
  layoutRoutes: PropTypes.arrayOf(routeShape),
  demoRoutes: PropTypes.arrayOf(routeShape)
};

const defaultProps = {
  componentRoutes: [],
  layoutRoutes: [],
  demoRoutes: []
};

class Navigation extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  state = {
    searchValue: ''
  };

  handleSearchChange = e => {
    const searchValue = e.target.value;
    this.setState(() => ({
      searchValue
    }));
  };

  render() {
    const { componentRoutes, layoutRoutes, demoRoutes } = this.props;
    const { searchValue } = this.state;
    const searchRE = new RegExp(searchValue, 'i');

    const filteredComponentRoutes = componentRoutes.filter(c => {
      c.filteredComponents = c.components.filter(component => searchRE.test(component.label));
      return searchRE.test(c.label) || c.filteredComponents.length > 0;
    });

    const filteredLayoutRoutes = layoutRoutes.filter(c => {
      c.filteredComponents = c.components.filter(component => searchRE.test(component.label));
      return searchRE.test(c.label) || c.filteredComponents.length > 0;
    });

    const filteredDemoRoutes = demoRoutes.filter(c => searchRE.test(c.label));

    return (
      <div className={css(styles.navigation)}>
        <div className={css(styles.navigationContent)}>
          <div className={css(styles.logo)}>
            <Link to="/">
              <img src={logo} alt="PatternFly Logo" />
            </Link>
          </div>
          <div className={css(styles.search)}>
            <input
              className={css(styles.input)}
              placeholder="Search components"
              type="text"
              value={searchValue}
              onChange={this.handleSearchChange}
            />
          </div>
          <NavigationItemGroup title="Style">
            <NavigationItem to="/styles/tokens" pkg="tokens">Tokens</NavigationItem>
            <NavigationItem to="/styles/icons" pkg="icons">Icons</NavigationItem>
          </NavigationItemGroup>
          {Boolean(filteredComponentRoutes.length) && (
            <NavigationItemGroup title="Components">
              {filteredComponentRoutes.map(route => (
                <NavigationItem
                  key={route.label}
                  to={route.to}
                  pkg={route.pkg}
                  components={route.filteredComponents || route.components}
                >
                  {route.label}
                </NavigationItem>
              ))}
            </NavigationItemGroup>
          )}
          {Boolean(filteredLayoutRoutes.length) && (
            <NavigationItemGroup title="Layouts">
              {filteredLayoutRoutes.map(route => (
                <NavigationItem
                  key={route.label}
                  to={route.to}
                  pkg={route.pkg}
                  components={route.filteredComponents || route.components}
                >
                  {route.label}
                </NavigationItem>
              ))}
            </NavigationItemGroup>
          )}
          {Boolean(filteredDemoRoutes.length) && (
            <NavigationItemGroup title="Demos">
              {filteredDemoRoutes.map(route => (
                <NavigationItem key={route.label} to={route.to}>
                  {route.label}
                </NavigationItem>
              ))}
            </NavigationItemGroup>
          )}
        </div>
      </div>
    );
  }
}

export default Navigation;
