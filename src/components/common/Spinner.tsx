const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div>
        <span className="loading loading-dots loading-md"></span>
      </div>
    </div>
  );
};

export default Spinner;
