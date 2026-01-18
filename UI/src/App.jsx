import React, { useState, useEffect, useRef } from 'react';

/**
 * 【自分用リハビリ計画】
 * 1. 自分でコードを打ち込む（写経）
 * 2. わからない行があったら質問する
 * 3. 納得したら自分なりの言葉でコメントを書き換える
 */
export default function App() {
  // --- 状態管理 (State): アプリが覚えているデータ ---
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [storage, setStorage] = useState(sar() => {
    const saved = localStorage.getItem('house_records');
    return saved ? JSON.parse(saved) : [];
  });

  // --- 参照 (Ref): 画面上の要素（入力欄など）を直接指さすための指差し棒 ---
  const textInputRef = useRef(null);
  const amountInputRef = useRef(null);

  // --- 副作用 (Effect): Stateが変化した時に「ついでに」やる処理 ---
  useEffect(() => {a
    localStorage.setItem('house_records', JSON.stringify(storage))
  }, [storage]);

  // --- 保存処理: ここがこのアプリの心臓部 ---
  const handle_storage = () => {
    const numAmount = Number(amount);
    if (text === '' || numAmount === 0 || isNaN(numAmount)) return;

    // 【ここがポイント】新しいデータの「形」を作っている
    const newData = {
      id: Date.now(),
      content: text,
      amount: Math.abs(numAmount), 
      type: numAmount > 0 ? 'income' : 'expense' 
    }

    // 【ここがポイント】今までのデータに新しいのを合体させて上書きする
    setStorage([newData, ...storage]);
    
    // 入力欄を空にする
    setText('');
    setAmount('');
    
    // 次の入力のために「用途」にカーソルを戻す
    textInputRef.current.focus();
  }

  // --- キーボードの Enter キーを検知する処理 ---
  const handleTextKeyDown = (e) => {
    if (e.key === 'Enter') amountInputRef.current.focus();
  };

  const handleAmountKeyDown = (e) => {
    if (e.key === 'Enter') handle_storage();
  };

  // --- 削除処理: 特定のID以外を残す（＝実質削除） ---
  const handle_delete = (targetId) => {
    setStorage(storage.filter((item) => item.id !== targetId));
  }

  // --- 集計処理: 配列をぐるぐる回して合計を出す ---
  const incomeTotal = storage
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const expenseTotal = storage
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalBalance = incomeTotal - expenseTotal;

  // ボタンを押せるかどうかの判定（バリデーション）
  const Isinvalid = text === '' || amount === '' || Number(amount) === 0;

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .list-item { animation: slideIn 0.3s ease-out forwards; }
        .trash-button:hover { background-color: #fee2e2 !important; color: #ef4444 !important; }
        .trash-button:hover .trash-lid { transform: translateY(-2px) rotate(-10deg); }
        .trash-button:active { transform: scale(0.9); }
        .column-header { font-weight: 900; font-size: 18px; padding-bottom: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; }
      `}</style>

      <h1 style={{ color: '#0f172a', fontSize: '32px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1.5px' }}>My Rehab Wallet 🏃‍♂️</h1>
      <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px' }}>※ 打ち込みながらコードの意味を自分のものにしていこう</p>

      {/* 入力フォームエリア */}
      <div style={{ backgroundColor: 'white', padding: '24px 30px', borderRadius: '24px', display: 'inline-block', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', marginBottom: '40px' }}>
        <input
          type="text"
          ref={textInputRef}
          value={text}
          placeholder="用途"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleTextKeyDown}
          autoFocus 
          style={{ padding: '14px', fontSize: '16px', borderRadius: '14px', border: '2px solid #f1f5f9', marginRight: '10px', outline: 'none', width: '180px' }}
        />
        <input
          type="number"
          ref={amountInputRef}
          value={amount}
          placeholder="金額 (+/-)"
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={handleAmountKeyDown}
          style={{ padding: '14px', fontSize: '16px', borderRadius: '14px', border: '2px solid #f1f5f9', marginRight: '10px', outline: 'none', width: '140px' }}
        />
        <button
          onClick={handle_storage}
          disabled={Isinvalid}
          style={{ padding: '14px 28px', fontSize: '16px', borderRadius: '14px', border: 'none', backgroundColor: Isinvalid ? '#cbd5e1' : '#1e293b', color: 'white', fontWeight: '900', cursor: Isinvalid ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
        >
          保存
        </button>
      </div>

      {/* 合計表示エリア */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', marginBottom: '50px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>収入合計</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#10b981' }}>+¥{incomeTotal.toLocaleString()}</div>
          <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: 'bold', marginTop: '12px' }}>支出合計</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#ef4444' }}>-¥{expenseTotal.toLocaleString()}</div>
        </div>
        <div style={{ width: '2px', height: '70px', backgroundColor: '#e2e8f0' }}></div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>現在の残高</p>
          <div style={{ fontSize: '64px', color: totalBalance < 0 ? '#ef4444' : '#0f172a', fontWeight: '950', lineHeight: 1 }}>¥{totalBalance.toLocaleString()}</div>
        </div>
      </div>

      {/* リスト表示エリア */}
      <div style={{ display: 'flex', gap: '30px', maxWidth: '900px', margin: '0 auto', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div className="column-header" style={{ color: '#10b981', borderBottom: '2px solid #10b981' }}>💰 収入</div>
          {storage.filter(item => item.type === 'income').map((item) => (
            <RecordItem key={item.id} item={item} on_delete={handle_delete} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div className="column-header" style={{ color: '#ef4444', borderBottom: '2px solid #ef4444' }}>💸 支出</div>
          {storage.filter(item => item.type === 'expense').map((item) => (
            <RecordItem key={item.id} item={item} on_delete={handle_delete} />
          ))}
        </div>
      </div>
    </div>
  );
}

// 個別の収支を表示する小さな部品
function RecordItem({ item, on_delete }) {
  const isIncome = item.type === 'income';
  return (
    <div className="list-item" style={{ backgroundColor: 'white', padding: '16px 20px', borderRadius: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontWeight: '800', fontSize: '16px', color: '#1e293b' }}>{item.content}</div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{new Date(item.id).toLocaleDateString()}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '18px', fontWeight: '900', color: isIncome ? '#10b981' : '#ef4444' }}>{isIncome ? '+' : '-'}¥{item.amount.toLocaleString()}</span>
        <button className="trash-button" onClick={() => on_delete(item.id)} style={{ backgroundColor: '#fff1f2', border: 'none', color: '#fda4af', width: '38px', height: '38px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <g className="trash-lid" style={{ transition: 'transform 0.2s', transformOrigin: 'center' }}><path d="M3 6h18M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></g>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}