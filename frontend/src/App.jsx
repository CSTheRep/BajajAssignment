import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const jsonInput = JSON.parse(input);
            const res = await axios.post('https://bajajassignment-hn1c.onrender.com/priyanshutest', { data: jsonInput.data });
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const handleFilterChange = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(f => f !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const filteredResponse = () => {
        if (!response) return null;

        const filtered = {};
        if (selectedFilters.includes('Numbers')) {
            filtered.numbers = response.numbers;
        }
        if (selectedFilters.includes('Alphabets')) {
            filtered.alphabets = response.alphabets;
        }
        if (selectedFilters.includes('Highest Alphabet')) {
            filtered.highest_alphabet = response.highest_alphabet;
        }

        return filtered;
    };

    return (
        <div className="p-10 grid content-center">
            <h1  className="text-3xl text-center font-bold mb-4 transform transition hover:-translate-y-2 ease-in duration-700">ABCD123</h1>
            <p className='flex space-x-2'>
              <h2 className='text-xs text-gray-700 pb-2'>Enter your Json's Example:{'{ "data": ["A","C","z"] }'}
              </h2>
              <p className='pb-2 text-md animate-bounce'>👇</p>
            </p>
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Enter JSON input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover"
                onClick={handleSubmit}
            >
                Submit
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {response && (
                <div className="mt-4 border p-2 rounded">
                    <div className="mb-4">
                        <label className="mr-2">Multi Filter:</label>
                        {['Numbers', 'Alphabets', 'Highest Alphabet'].map(filter => (
                            <label key={filter} className="mr-2">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(filter)}
                                    onChange={() => handleFilterChange(filter)}
                                />
                                {filter}
                            </label>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Filtered Response</h2>
                        {Object.entries(filteredResponse()).map(([key, value]) => (
                            <p key={key}>{key}: {value.join(', ')}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;