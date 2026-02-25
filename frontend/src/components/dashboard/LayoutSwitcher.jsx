const LayoutSwitcher = ({ layout, setLayout }) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => setLayout("sidebar")}
        className="mr-2 bg-indigo-500 text-white px-3 py-1 rounded"
      >
        Sidebar Layout
      </button>

      <button
        onClick={() => setLayout("top")}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Top Layout
      </button>
    </div>
  );
};

export default LayoutSwitcher;