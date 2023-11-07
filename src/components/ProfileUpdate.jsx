import { useEffect } from 'react';
import { useState } from 'react';

const ProfileUpdate = () => {
  const [image, setImage] = useState(localStorage.getItem('profile-picture'));
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem('profile-details'))?.name || ''
  );
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem('profile-details'))?.email || ''
  );

  const upload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem('profile-picture', reader.result);
      window.dispatchEvent(new CustomEvent('update-profile-pic'));
    };
  };

  useEffect(() => {
    localStorage.setItem('profile-details', JSON.stringify({ name, email }));
    window.dispatchEvent(new CustomEvent('update-profile-details'));
  }, [name, email]);

  return (
    <div className="bg-white w-8/12 lg:w-full rounded-xl p-10 flex flex-col gap-5 mt-4">
      <div className="flex flex-col">
        <span className="font-bold text-3xl">Profile details</span>
        <span className="text-gray-400 mt-2">
          Add your profile details below and then share all your profiles with
          the world!
        </span>
        <div className="bg-gray-50 p-5 mt-5 rounded-lg flex flex-wrap items-center gap-5 lg:justify-center">
          {image ? (
            <img
              src={image}
              alt="profile picture"
              className="cursor-pointer rounded-lg w-40 h-40 mt-5 object-cover"
            />
          ) : (
            <label
              htmlFor="profile-pic"
              className="animate-pulse cursor-pointer bg-gray-300 rounded-lg w-40 h-40 mt-5"
            />
          )}
          <input
            type="file"
            className="hidden"
            name="profile-pic"
            id="profile-pic"
            onChange={upload}
            accept=".png, .jpg, .jpeg"
          />
          <span className="text-gray-700 text-sm">
            Image must be bellow PNG, JPG, JPEG format.
          </span>
        </div>
        <div className="bg-gray-50 p-5 mt-5 rounded-lg flex flex-wrap items-center gap-5 lg:justify-center">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="text-gray-500 text-sm">
              Name
            </label>
            <input
              type="text"
              id="Name"
              placeholder="Type your name"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-gray-500 text-sm">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Type your email"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
