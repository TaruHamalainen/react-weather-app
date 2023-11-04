export default function Form({ input, onInputChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="self-center flex items-center gap-2">
      <input
        className="rounded-lg p-3 focus:outline-none"
        type="text"
        placeholder="search..."
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
      />
      {navigator.geolocation && (
        <button className="bg-indigo-800 p-2 rounded-lg text-white font-bold">
          Search
        </button>
      )}
    </form>
  );
}
