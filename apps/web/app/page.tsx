'use client';
import useStore from '../store/useStore';

export default function Page() {
  const { count, increment, decrement } = useStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-white bg-gradient-to-r from-purple-500 to-pink-500">
      <h1 className="text-4xl font-bold">Count: {count}</h1>
      <div className="flex gap-4">
        <button
          onClick={increment}
          className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          +
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          -
        </button>
      </div>
    </div>
  );
}
