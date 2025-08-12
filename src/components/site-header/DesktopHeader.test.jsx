import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import DesktopHeader from './DesktopHeader';

describe('DesktopHeader', () => {
  const defaultProps = {
    logo: 'test-logo.png',
    logoAltText: 'Test Logo',
    logoDestination: 'http://example.com',
    loggedIn: false,
  };

  const renderComponent = (props = {}) => render(
    <IntlProvider locale="en" messages={{}}>
      <DesktopHeader {...defaultProps} {...props} />
    </IntlProvider>,
  );

  it('renders logo correctly', () => {
    const { getByRole } = renderComponent();
    const logo = getByRole('img', { name: 'Test Logo' });
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain('test-logo.png');
  });

  it('renders logged out items when user is not logged in', () => {
    const loggedOutItems = [
      { type: 'item', content: 'Sign in', href: '/login' },
      { type: 'item', content: 'Register', href: '/register' },
    ];
    renderComponent({ loggedOutItems });

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('renders user menu when logged in', () => {
    const userMenu = [
      { type: 'item', content: 'Profile', href: '/profile' },
      { type: 'item', content: 'Logout', href: '/logout' },
    ];
    const username = 'testuser';
    renderComponent({ loggedIn: true, userMenu, username });

    const userButton = screen.getByRole('button', { name: /testuser/i });

    expect(userButton).toBeInTheDocument();

    fireEvent.click(userButton);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders main menu items correctly', () => {
    const mainMenu = [
      { type: 'item', content: 'Courses', href: '/courses' },
      { type: 'item', content: 'Programs', href: '/programs' },
    ];
    renderComponent({ mainMenu });

    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Programs')).toBeInTheDocument();
  });

  it('renders skip navigation link', () => {
    renderComponent();
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });
});
