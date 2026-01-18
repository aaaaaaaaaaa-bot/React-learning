import React, { useState, useEffect } from 'react';

export default function App() {
  // 1. 【State】: 脳みその役割。「今、何が起きているか」を記憶する。
  // text という箱と、それを更新する setText という魔法を用意
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  // 画面読み込み時に保存した内容の表示
  const [storage, setStorage] = useState(() => {
    const storedRecords = localStorage.getItem('house_records');
    return storedRecords ? JSON.parse(storedRecords) : [];
  });

  // storage内容が変更されるごとにlocalstorageの内容を更新
  useEffect(
    () => {
      localStorage.setItem('house_records', JSON.stringify(storage))
    }, [storage]
  );

  const handle_storage = () => {
    //オブジェクトの生成,contentは適当な名前
    const newData = {
      id: Date.now(),
      content: text,
      amount: amount
    }

    //入力欄の内容をstorageに保存
    setStorage([...storage, newData]);
    //入力欄の初期化
    setText('');
    setAmount('');
    //ここでsetStorage(e.target.value);にしちゃうとボタンのvalueを取ろうとしてそんなものないからundefinedになっちゃうだからtextをそのまま持ってきてる
  }

  const handle_delete = (targetId) => {
    const deleteData = storage.filter((item) => item.id !== targetId)

    setStorage(deleteData);
  }


  const totalNumber = storage.reduce((currentValue, item) => {
    return currentValue + Number(item.amount);
  }, 0);

  //ボタン制御
  const Isinvalid = text === '' || amount === '' || Number(amount) === 0;

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>リハビリ・ステップ1 🏃‍♂️</h1>
      <p>入力したものが、下にそのまま出るよ</p>

      {/* 2. 【Input】: 変化のきっかけ。 */}
      <div>
        <input
          type="text"
          value={text}
          placeholder="ここに入力してみて"
          // 文字が打たれるたびに、setTextを使ってtextの箱を中身を入れ替える
          onChange={(e) => setText(e.target.value)}
          style={{ padding: '10px', fontSize: '18px', borderRadius: '8px', border: '2px solid #ddd' }}
        />
        <input
          type="number"
          value={amount}
          placeholder="金額を入力"
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: '10px', fontSize: '18px', borderRadius: '8px', border: '2px solid #ddd' }}
        />

        <button
          onClick={handle_storage}
          disabled={Isinvalid}
        >追加</button>

      </div>

      {/* 3. 【Output】: 画面への表示。State(text)の中身が勝手に出る。 */}
      {/*storageの内容を表示*/}
      <ul>
        {storage.map((item) => (
          <li
            key={item.id}
            style={{ listStyle: 'none', marginTop: '20px', fontSize: '24px', fontWeight: 'bold', color: '#4a90e2' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <p>品目</p>
              {item.content}
              <p>金額</p>
              {item.amount}
              <p>円</p>
              <button onClick={() => handle_delete(item.id)}>削除</button>
            </div>
          </li>
        ))
        }
      </ul>

      <p style={{ marginTop: '20px', fontSize: '24px', fontWeight: 'bold', color: '#4a90e2' }}>合計金額：{totalNumber}</p>

      <div style={{ marginTop: '40px', color: '#666', fontSize: '14px' }}>
        <p>【復習メモ】</p>
        <p>1. useState('') は「最初は空っぽ」という意味</p>
        <p>2. onChange がないと、入力欄はただの石（動かない）</p>
        <p>3. Reactは「Stateが変わると、画面を勝手に描き直す」天才</p>
      </div>
    </div>
  );
}