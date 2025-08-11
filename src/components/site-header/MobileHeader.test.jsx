import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import MobileHeader from './MobileHeader';

const defaultProps = {
  mainMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: 'test-logo.png',
  logoAltText: 'Test Logo',
  logoDestination: 'http://example.com',
  avatar: 'avatar.png',
  username: 'testuser',
  loggedIn: false,
  stickyOnMobile: true,
};

describe('MobileHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => render(
    <IntlProvider locale="en">
      <MobileHeader {...defaultProps} {...props} />
    </IntlProvider>,
  );

  it('renders logo correctly', () => {
    renderComponent();
    const logo = screen.getByAltText('Test Logo');
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain('test-logo.png');
  });

  it('renders main menu when provided', () => {
    const mainMenu = [
      { type: 'item', content: 'Menu Item 1', href: '/item1' },
      { type: 'item', content: 'Menu Item 2', href: '/item2' },
    ];
    renderComponent({ mainMenu });
    expect(screen.getByLabelText('Main Menu')).toBeInTheDocument();
  });

  it('renders user menu for logged in users', () => {
    const userMenu = [
      { type: 'item', content: 'Profile', href: '/profile' },
      { type: 'item', content: 'Settings', href: '/settings' },
    ];
    renderComponent({ userMenu, loggedIn: true });
    expect(screen.getByRole('button', { name: /account menu/i })).toBeInTheDocument();
  });

  it('renders logged out items when not logged in', () => {
    const loggedOutItems = [
      { type: 'item', content: 'Sign In', href: '/login' },
      { type: 'item', content: 'Register', href: '/register' },
    ];
    renderComponent({ loggedOutItems, loggedIn: false });
    expect(screen.getByRole('button', { name: /account menu/i })).toBeInTheDocument();
  });

  it('applies sticky class when stickyOnMobile is true', () => {
    renderComponent({ stickyOnMobile: true });
    expect(screen.getByRole('banner')).toHaveClass('sticky-top');
  });
});
