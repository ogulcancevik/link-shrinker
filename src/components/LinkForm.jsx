import { useEffect } from 'react';
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

const LinkForm = () => {
  const [links, setLinks] = useState([]);
  const addLink = () =>
    setLinks([...links, { name: '', url: '', bgColor: '#000', textColor: '#fff' }]);
  const getCachedLinks = () => {
    const links = JSON.parse(localStorage.getItem('links'));
    setLinks(links || []);
  };
  useEffect(() => {
    getCachedLinks();
  }, []);
  const save = () => {
    const anyLinksEmpty = links.some((link) => !link.name || !link.url);
    if (anyLinksEmpty) {
      alert('Please fill all the links');
      return;
    }
    localStorage.setItem('links', JSON.stringify(links));
    window.dispatchEvent(new CustomEvent('update-links'));
  };
  return (
    <div className="bg-white w-8/12 lg:w-full rounded-xl p-10 flex flex-col gap-5 mt-4">
      <div className="flex flex-col">
        <span className="font-bold text-3xl">Customize your links</span>
        <span className="text-gray-400 mt-2">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </span>
        <div className="flex gap-5">
          <button
            className="flex items-center justify-center gap-2 mt-10 border border-blue-500 text-blue-500 font-bold py-2.5 px-8 rounded-lg hover:bg-blue-500 hover:text-white transition-all group"
            onClick={addLink}
          >
            <BsPlusLg
              size={20}
              className="text-blue-500 group-hover:text-white transition-all"
            />
            Add new link
          </button>
          <button
            className="flex items-center justify-center gap-2 mt-10 border border-blue-500 text-blue-500 font-bold py-2.5 px-8 rounded-lg hover:bg-blue-500 hover:text-white transition-all group"
            onClick={save}
          >
            Save changes
          </button>
        </div>
      </div>
      <Links links={links} setLinks={setLinks} />
    </div>
  );
};

export default LinkForm;

const Links = ({ links, setLinks }) => {
  const remove = (index) => {
    links.splice(index, 1);
    setLinks([...links]);
    localStorage.setItem('links', JSON.stringify(links));
    window.dispatchEvent(new CustomEvent('update-links'));
  };
  return (
    <div className="flex flex-col gap-5 overflow-auto h-[450px]">
      <AnimatePresence>
        {links.length &&
          links.map((link, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
              key={index}
              className="bg-gray-50 p-5 w-full rounded-lg"
            >
              <div key={index}>
                <div className="text-gray-400 font-bold flex justify-between">
                  <span>Link #{index + 1}</span>
                  <span className="cursor-pointer" onClick={remove}>
                    Remove
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="link-name"
                      className="text-gray-500 text-sm"
                    >
                      Link name
                    </label>
                    <input
                      type="text"
                      id="link-name"
                      placeholder="Type link name"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      defaultValue={link.name}
                      onChange={(e) => {
                        if (links[index]) {
                          links[index].name = e.target.value;
                          setLinks([...links]);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="url " className="text-gray-500 text-sm">
                      URL
                    </label>
                    <input
                      type="text"
                      id="url"
                      placeholder="Type URL"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      defaultValue={link.url}
                      onChange={(e) => {
                        if (links[index]) {
                          links[index].url = e.target.value;
                          setLinks([...links]);
                        }
                      }}
                    />
                  </div>
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-2 items-center">
                      <label htmlFor="color" className="text-gray-500 text-sm">
                        Color (optional)
                      </label>
                      <input
                        type="color"
                        id="color"
                        value={link.bgColor}
                        onChange={(e) => {
                          if (links[index]) {
                            links[index].bgColor = e.target.value;
                            setLinks([...links]);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <label
                        htmlFor="text-color"
                        className="text-gray-500 text-sm"
                      >
                        Text - Color (optional)
                      </label>
                      <input
                        type="color"
                        id="text-color"
                        value={link.textColor}
                        onChange={(e) => {
                          if (links[index]) {
                            links[index].textColor = e.target.value;
                            setLinks([...links]);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};
