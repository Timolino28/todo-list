function WeekDays() {
  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between border-b-2 border-gray-300">
          <div>
            <h2 className="md:text-xl font-bold text-gray-300">11. Oct</h2>
          </div>
          <div className="md:text-xl text-gray-300/40">Sa</div>
        </div>

        {/* Input-Container */}
        <div className="mt-3">
          <div className="py-1 border-b-1 border-gray-300/40 hover:border-oranje">
            <label className="">
              <input
                type="text"
                className="cursor-auto outline-none focus:shadow-md focus:p-2 text-gray-300 max-w-full"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeekDays;
