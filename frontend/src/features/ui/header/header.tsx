import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const menuRoutes = [
  {
    name: 'Home',
    route: '/',
  },
  {
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    name: 'Create data',
    route: '/create-data',
  },
  {
    name: 'Search data',
    route: '/search-data',
  },
];

const Menu: FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 border-b border-gray-600 bg-primary-bg">
      <nav className="flex flex-row items-center justify-center gap-10">
        {menuRoutes.map((route) => (
          <Link className="underline " key={route.name} to={route.route}>
            {route.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Menu;
