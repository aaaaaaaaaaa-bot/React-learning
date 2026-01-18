import React, { useState, useEffect, ChangeEvent } from "react";

interface RecordData {
  id: number;
  content: string;
  amount: number;
  category: string;
}

export default function App() {
  const [content, setContent] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category,setCategory] = useState<string>("食費")
  const [storage, setStorage] = useState<RecordData[]>(() => {
    const storedRecords = localStorage.getItem("house_storage");
    return storedRecords ? (JSON.parse(storedRecords) as RecordData[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("house_storage", JSON.stringify(storage));
  }, [storage]);

  const handleContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }

  const handleStorage = () => {
    if (content === "" || amount === "" || Number(amount) === 0) {
      return;
    }

    const newData: RecordData = {
      id: Date.now(),
      content,
      amount: Number(amount),
      category,
    };

    setStorage((preData) => [...preData, newData]);

    setContent("");
    setAmount("");
  };

  const handleDelete = (id: number) => {
    const newArray = storage.filter((item) => item.id !== id);
    setStorage(newArray);
  };

  const total = storage.reduce((sum,item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 text-gray-800 font-sans">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">家計簿</h1>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl shadow-xl text-white mb-8 transition-transform hover:scale-[1.02]">
          <div className="flex justify-between items-end mb-4 px-2">
            <p className="text-white font-bold">合計金額</p>
            <p className={`text-2xl font-black ${
            total >= 0 
              ? "text-emerald-400" 
              : "text-rose-400"
            }`}>
              {total.toLocaleString()}円
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                カテゴリー
              </label>
              <select
                value={category}
                onChange={handleCategory}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:-border-indigo outline-none transition-colors"
              >
                <option value="食費">🍔 食費</option>
                <option value="光熱費">💡 光熱費</option>
                <option value="家賃">🏠 家賃</option>
                <option value="日用品">🧻 日用品</option>
                <option value="娯楽">🎮 娯楽</option>
                <option value="その他">📦 その他</option>

              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                内容
              </label>
              <input
                type="text"
                value={content}
                placeholder="内容を入力してください"
                onChange={handleContent}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:-border-indigo outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                金額
              </label>
              <input
                type="number"
                value={amount}
                placeholder="金額を入力してください"
                onChange={handleAmount}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:-border-indigo outline-none transition-colors"
              />
            </div>
            <button
              onClick={handleStorage}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md active:scale-95 transition-all mt-2"
            >
              追加
            </button>
          </div>
        </div>
      
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 px-2">記録</h2>
          <ul style={{ listStyle: "none" }}>
            {storage.map((item) => (
              <li 
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border-indigo-400"
              >
                <div className="flex items-center flex-grow">
                  <span className="font-bold text-gray-700 w-24 truncate">
                    {item.category}
                  </span>

                <div className="h-6 border-l-2 border-gray-200 mx-4"></div>

                  <span className="font-bold text-gray-700 w-24 truncate">
                    {item.content}
                  </span>
                  
                  <div className="h-6 border-l-2 border-gray-200 mx-4"></div>
                  
                  <span className="text-lg font-medium text-gray-900">
                    {item.amount.toLocaleString()} <span className="text-xs text-gray-500 font-normal">円</span>
                  </span>
                </div>

                <div className="flex itens-center gap-4">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
