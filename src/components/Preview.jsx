import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useEffect } from 'react';
import { linkControl } from '../helpers/linkControl';
import { motion } from 'framer-motion';

const PhoneMockup = () => {
  const [image, setImage] = useState(localStorage.getItem('profile-picture'));
  const [links, setLinks] = useState([]);
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem('profile-details'))?.name || ''
  );
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem('profile-details'))?.email || ''
  );
  const getCachedLinks = () => {
    const links = JSON.parse(localStorage.getItem('links'));
    setLinks(links || []);
  };
  const getCachedImage = () => {
    const image = localStorage.getItem('profile-picture');
    setImage(image);
  };
  const getCachedDetails = () => {
    const details = JSON.parse(localStorage.getItem('profile-details'));
    setName(details?.name || '');
    setEmail(details?.email || '');
  };
  useEffect(() => {
    getCachedLinks();
  }, []);
  const openLink = (url) => {
    const link = linkControl(url);
    window.open(link, '_blank');
  };
  useEffect(() => {
    window.addEventListener('update-links', getCachedLinks);
    window.addEventListener('update-profile-pic', getCachedImage);
    window.addEventListener('update-profile-details', getCachedDetails);
    return () => {
      window.removeEventListener('update-links', getCachedLinks);
      window.removeEventListener('update-profile-pic', getCachedImage);
      window.removeEventListener('update-profile-details', getCachedDetails);
    };
  }, []);
  return (
    <div className="bg-white w-4/12 lg:w-full rounded-xl p-10 mt-4">
      <div className="flex flex-col items-center">
        {image ? (
          <img
            src={image}
            alt="profile"
            className="rounded-full w-48 h-48 object-cover"
          />
        ) : (
          <div className="animate-pulse bg-gray-300 rounded-full w-48 h-48" />
        )}
        <div className="flex flex-col justify-center items-center gap-3 mt-7">
          {name ? (
            <span className="text-2xl font-bold">{name}</span>
          ) : (
            <div className="animate-pulse bg-gray-300 rounded-full w-72 h-6" />
          )}
          {email ? (
            <span className="text-gray-400">{email}</span>
          ) : (
            <div className="animate-pulse bg-gray-300 rounded-full w-36 h-2.5" />
          )}
        </div>
        <div className="mt-12 flex flex-col gap-3">
          <AnimatePresence>
            {links.length ? (
              links.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                  key={index}
                  className="text-white rounded-lg w-96 xl:w-64 xl:text-sm h-14 flex px-5 items-center cursor-pointer"
                  style={{ backgroundColor: link.bgColor }}
                  onClick={() => openLink(link.url)}
                >
                  <span className="font-bold" style={{ color: link.textColor }}>
                    {link.name}
                  </span>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="animate-pulse bg-gray-300 rounded-lg xl:w-64 xl:text-sm w-96 h-14"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
