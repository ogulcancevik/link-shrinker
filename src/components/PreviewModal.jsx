import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { linkControl } from '../helpers/linkControl';

const PreviewModal = ({ setShowModal }) => {
  const [image] = useState(localStorage.getItem('profile-picture'));
  const [links, setLinks] = useState([]);
  const [name] = useState(
    JSON.parse(localStorage.getItem('profile-details'))?.name || ''
  );
  const [email] = useState(
    JSON.parse(localStorage.getItem('profile-details'))?.email || ''
  );

  const getCachedLinks = () => {
    const links = JSON.parse(localStorage.getItem('links'));
    setLinks(links || []);
  };
  useEffect(() => {
    getCachedLinks();
  }, []);

  const openLink = (url) => {
    const link = linkControl(url);
    window.open(link, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className="bg-gray-100 absolute right-0 left-0 top-0 bottom-0 flex items-center flex-col pt-12"
    >
      <AiOutlineClose
        size={30}
        className="absolute right-5 top-5 cursor-pointer"
        onClick={() => setShowModal(false)}
      />
      <span className="text-2xl font-bold mb-5">Preview</span>
      <div className="flex gap-5">
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt="profile"
            className="w-40 h-40 rounded-full object-cover"
          />
          <span className="text-2xl font-bold mt-5">{name}</span>
          <span className="text-gray-500 mt-2">{email}</span>
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
                    <span
                      className="font-bold"
                      style={{ color: link.textColor }}
                    >
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
    </motion.div>
  );
};

export default PreviewModal;
