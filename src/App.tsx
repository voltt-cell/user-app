import { useEffect, useState } from "react";
import data from "./data.json";

interface User {
  id: number;
  full_name: string;
  description: string;
  company_title: string;
  address: string;
}

const fetchRandomImages = (
  setRandomPicsUrl: React.Dispatch<React.SetStateAction<string[] | undefined>>
) => {
  fetch("https://dog.ceo/api/breeds/image/random/9")
    .then((response) => response.json())
    .then((data) => {
      setRandomPicsUrl(data.message);
    });
};

function App() {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [randomPicsUrl, setRandomPicsUrl] = useState<string[] | undefined>(
    undefined
  );
  useEffect(() => {
    if (selectedUser) {
      fetchRandomImages(setRandomPicsUrl);
      const intervalId = setInterval(() => {
        fetchRandomImages(setRandomPicsUrl);
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [selectedUser]);

  return (
    <div className="App">
      <div className="flex justify-center w-full p-4 border-b-gray-200 border-b">
        <h1 className="text-3xl font-bold">Customer Detail App</h1>
      </div>
      <div className="h-[92vh] flex max-lg:flex-col w-full">
        <div className="w-full lg:max-w-[500px] max-lg:h-[300px] overflow-scroll border-r border-gray-200">
          <ul className="flex flex-col max-lg:flex-row justify-start">
            {data.map((entry: User) => (
              <li
                key={entry.id}
                className={`border-b border-gray-200 p-6 flex items-start flex-col cursor-pointer ${
                  selectedUser?.id === entry.id
                    ? "bg-gray-300 border-r-2 border-r-black"
                    : ""
                }`}
                onClick={() => setSelectedUser(entry)}
              >
                <h2 className="text-xl font-semibold py-2">
                  {entry.full_name}
                </h2>
                <p className="text-base text-gray-700 max-lg:hidden">
                  {entry.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 w-full px-10 overflow-y-scroll py-6 ">
          {selectedUser ? (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold py-2">
                {selectedUser?.full_name}
              </h2>
              <p className="text-base text-gray-700">
                {selectedUser?.description}
              </p>
              <p className="text-base text-gray-700">
                <span className="font-semibold">Title:</span>{" "}
                {selectedUser?.company_title}
              </p>
              <p className="text-base text-gray-700">
                <span className="font-semibold">Address: </span>
                {selectedUser?.address}
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-5">
                {randomPicsUrl?.map((image: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className="w-[300px] rounded-lg h-[300px] overflow-hidden shadow-xl bg-white"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center text-lg ">
              No Customer Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
