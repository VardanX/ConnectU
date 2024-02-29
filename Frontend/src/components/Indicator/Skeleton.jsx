export default function Skeleton() {
  return (
    <div className="border border-blue-100 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col gap-y-4 ">
        <div className="flex space-x-4">
          <div className="rounded-full bg-blue-100 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="w-32 space-y-2">
              <div className="h-2 bg-blue-100 rounded"></div>
              <div className="h-2 bg-blue-100 rounded"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-20 bg-blue-100"></div>
        <div className="h-2 bg-blue-100 rounded"></div>
      </div>
    </div>
  );
}
