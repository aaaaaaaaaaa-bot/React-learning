import React, { useState, useEffect, use } from 'react';

export default function App() {
  const [formData, setFormData] = useState([//入力ホームのデータを保持する用
    { id: "amount", text: "" },//金額の入力情報
    { id: "content", text: "" },//使用用途を入力情報
    { id: "type", text: "収入" },//収入・支出の管理
  ]);

  // 読み込みロジックを useEffect から完全に分離
  const initializeData = () => {
    const storedRecords = localStorage.getItem('kakeiboRecords');//localStorageから情報を取得
    return storedRecords ? JSON.parse(storedRecords) : [];//情報がないなら空の配列を入れて情報があるなら情報が入った配列を入れる
  };

  // Stateの初期値としてこの関数を渡す
  const [data, setData] = useState(initializeData);//上記の入力情報の保存用//

  //起動時にデータを読み込み配列に追加
  useEffect(() => {
   localStorage.setItem('kakeiboRecords', JSON.stringify(data));//dataが更新されるたびにlocalStorageに情報を追加する
  }, [data])


  //入力欄に変更があった時に変更を反映させる関数
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData(prevFormData =>
      prevFormData.map(item =>
        item.id === id
          ? { ...item, text: value }
          : item
      )
    );
  };

  {/*間違い
  //formData内からtextの値を取り出すための関数
  const getValue = (data,id) => (
    data.id === id ? data.text  : ""
  )
  */}

  //修正
  const getRecordValue = (recordData, id) => {
    // recordData（[{id:"amount",text:""},...]）からIDが一致する要素を探す
    const field = recordData.find(item => item.id === id);

    // 見つかった要素の text を返す
    return field ? field.text : '';
  };

  //入力欄のデータ保存用の関数
  {/*間違い
    //データを保存用配列へ移動
    setData(prevData =>
      prevData.map(item => ( 
        {...item,formData}
      ))
    );
    */}
  // 修正後: data配列に新しい記録（formData）を追加する
  // 修正後
  const saveData = () => {
    // 1. data配列に新しい記録（formData）を追加する
    setData(prevData => [...prevData, formData]);

    // 2. 入力欄のリセット
    setFormData(prevFormData =>
      prevFormData.map(item => (
        item.id === "type"
          ? { ...item, text: "収入" }
          : { ...item, text: "" }
      ))
    );
  };


  return (
    <ul>
      <h1>家計簿</h1>

      {/*金額の入力欄*/}
      <input
        type="text"
        id="amount"
        placeholder='金額を入力してください'
        onChange={handleChange}
        value={getRecordValue(formData, 'amount')}
      />

      {/*使用用途の入力欄*/}
      <input
        type="text"
        id="content"
        placeholder='用途を入力してください'
        onChange={handleChange}
        value={getRecordValue(formData, 'content')}
      />

      {/*支出・収入の選択欄*/}
      <label>収入・支出の選択</label>
      <select id="type" onChange={handleChange} value={getRecordValue(formData, 'type')}>
        <option value="収入">収入</option>
        <option value="支出">支出</option>
      </select>

      <button onClick={saveData}>保存</button>

      <h2>記録</h2>
      {data.map((record, index) => (
        <li key={index}>
          <p>金額:{getRecordValue(record, "amount")}</p>
          <p>用途:{getRecordValue(record, "content")}</p>
          <p>{getRecordValue(record, "type")}</p>
        </li>
      ))}
    </ul>
  );
}