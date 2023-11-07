import { ImShrink } from 'react-icons/im';
import { HiOutlineLink } from 'react-icons/hi';
import { PiUserCircle } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const routes = [
  {
    name: 'Links',
    icon: <HiOutlineLink size={24} />,
    path: '/',
  },
  {
    name: 'Profile Details',
    icon: <PiUserCircle size={24} />,
    path: '/profile',
  },
];

const Header = ({ setShowModal }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeRoute = useCallback(
    (path) => {
      return pathname === path;
    },
    [pathname]
  );
  return (
    <div className="bg-white rounded-b-xl flex items-center justify-between px-10 h-20">
      <span className="flex gap-4 items-center cursor-pointer">
        <ImShrink
          size={24}
          className="text-blue-500 hover:rotate-90 transition-all duration-500"
        />
        <span className="font-bold text-2xl md:hidden" onClick={() => navigate('/')}>
            Link <span className="text-blue-500">Shrinker</span>
        </span>
      </span>
      <ul className="flex gap-5">
        {routes.map((route, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 hover:bg-blue-100 hover:text-blue-500 hover:bg-opacity-50 transition-all py-3 px-4 rounded-lg cursor-pointer ${
              activeRoute(route.path)
                ? 'bg-blue-100 text-blue-500 bg-opacity-50'
                : ''
            }`}
            onClick={() => navigate(route.path)}
          >
            {route.icon}
            {route.name}
          </li>
        ))}
      </ul>
      <button
        className="border border-blue-500 text-blue-500 font-bold py-3 px-8 rounded-lg"
        onClick={setShowModal}
      >
        Preview
      </button>
    </div>
  );
};

export default Header;
