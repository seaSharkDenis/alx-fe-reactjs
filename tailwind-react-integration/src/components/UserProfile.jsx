function UserProfile() {
  return (
    <div className="mx-auto my-20 max-w-sm bg-gray-100 rounded-lg shadow-lg p-4 sm:max-w-sm sm:p-6 md:p-8 md:max-w-md">
      <img className="mx-auto rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36" src="https://img.icons8.com/?size=100&id=108639&format=png&color=000000" alt="User" />
      <h1 className="mt-4 text-lg font-medium md:text-2xl sm:text-xl text-blue-800">John Doe</h1>
      <p className="mt-2 text-sm text-gray-600 sm:text-base md:text-lg">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;