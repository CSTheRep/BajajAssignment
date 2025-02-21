import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" }
];

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format");
      }
      const res = await axios.post("https://your-backend-url.com/bfhl", parsedInput);
      setResponse(res.data);
      toast.success("Data processed successfully!");
    } catch (error) {
      toast.error("Invalid input or API error!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">JSON Processor</h1>

        <textarea
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder='Enter JSON (e.g. { "data": ["A","B","1","3"] })'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />

        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full">
          Submit
        </button>

        {response && (
          <div className="mt-4 w-full">
            <Select
              options={options}
              isMulti
              onChange={setSelectedFilters}
              className="mb-2"
              placeholder="Select response filters"
            />

            <div className="p-4 border rounded bg-white">
              {selectedFilters.map((filter) => (
                <p key={filter.value}>
                  <strong>{filter.label}: </strong>
                  {JSON.stringify(response[filter.value])}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default App;