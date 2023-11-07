import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Header from '../components/Header';
import Preview from '../components/Preview';
import PreviewModal from '../components/PreviewModal';

const MainLayout = ({
  children
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-gray-100 h-screen md-h:h-auto">
      <Header setShowModal={setShowModal} />
      <div className="flex gap-5 lg:flex-wrap">
        <Preview />
        {children}
      </div>
      <AnimatePresence>
        {showModal && <PreviewModal setShowModal={setShowModal} />}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;