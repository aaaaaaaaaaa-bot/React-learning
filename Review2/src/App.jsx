import React, { useState, useEffect } from 'react';

export default function ApiRehab() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  // 【慣れ親しんだ .then() の書き方】
  const fetchAdvice = () => {
    setLoading(true);

    // 1. fetch（リクエスト送信）
    fetch('https://api.adviceslip.com/advice')
      // 2. 成功したら JSON に変換
      .then((response) => {
        return response.json();
      })
      // 3. 変換が終わったら State に保存
      .then((data) => {
        setAdvice(data.slip.advice);
        setLoading(false);
      })
      // 4. 何かエラーがあったらここでキャッチ
      .catch((error) => {
        console.error('通信エラー:', error);
        setLoading(false);
      });
  };

  // 初回読み込み時に実行
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>APIリハビリ（.then版）🌐</h1>
      <p>半年前に使っていた「あの書き方」で復習</p>

      <div style={{ 
        marginTop: '30px', 
        padding: '30px', 
        backgroundColor: '#eef2f7', 
        borderRadius: '15px',
        minHeight: '100px'
      }}>
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{advice}</p>
        )}
      </div>

      <button 
        onClick={fetchAdvice}
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#4a90e2', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        次のアドバイス
      </button>

      <div style={{ marginTop: '50px', textAlign: 'left', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <h3>💡 半年前の記憶を呼び戻すポイント</h3>
        <ul>
          <li><strong>fetch()</strong> : 最初の「お願いします！」の合図。</li>
          <li><strong>.then()</strong> : 「それが終わったら、次はこれをやってね」という約束。</li>
          <li><strong>response.json()</strong> : 届いたデータをJavaScriptで使える形にする魔法（これも時間がかかるから.thenが必要）。</li>
        </ul>
        <p style={{ color: '#666', fontSize: '12px' }}>
          ※ 最近の <code>async/await</code> は、この「.then」を <code>await</code> という一言で済ませちゃう書き方なんです。
        </p>
      </div>
    </div>
  );
}