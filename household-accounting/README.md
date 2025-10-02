# 支出・収入トラッカー(家計簿)

**アプリの基本的な流れ**

データの入力: ユーザーが金額を入力し、「収入」または「支出」のどちらかを選択します。

データの保存: 「記録」ボタンを押すと、そのデータ（金額、タイプなど）がrecordsという配列（State）に追加されます。

自動計算と表示: recordsの状態が更新されるたびに、reduceメソッドが自動的に働き、以下の集計結果を計算して表示します。

## 実装内容

1. データの構造と入力フォーム

まず、どんなデータを扱うかを決め、そのためのStateと入力フォームを用意します

2. reduceによる合計計算（核心部分）

これがこのアプリのメインの練習です。全ての記録（records）から「純利益」と「支出/収入の合計」を計算します。

3. useEffectによる自動計算と保存

データが変わるたびに、再計算とLocalStorageへの保存を自動で行いましょう。

### メモ

#### select要素（ドロップダウンリスト）の基本的な使い方

select要素は、ユーザーに複数の選択肢から1つまたは複数の項目を選ばせるためのドロップダウンリスト（選択ボックス）を作成します。

基本構造

<select>要素の内部に、各選択肢を定義する<option>要素をネストして記述します。
```JavaScript
<label for="fruits">好きな果物を選んでください:</label>
<select id="fruits" name="favorite_fruit">
  <option value="apple">りんご</option>
  <option value="banana">バナナ</option>
  <option value="orange" selected>オレンジ</option>
</select>
```
|要素・属性|説明|
|---|---|
|<select>|ドロップダウンリストのコンテナ（枠）を定義します。|
|name|フォーム送信時にサーバーに送られるデータの名前を設定します（必須）。|
|id	|<label>と関連付けるためのIDを設定します。|
|<option>|リスト内の個別の選択肢を定義します。|
|value|選択肢が選ばれた際にサーバーに送信される値を設定します。valueがない場合、<option>タグ内の表示テキストが値として送信されます。|
|selected|ページが読み込まれたときに、この選択肢をデフォルトで選択された状態にします。|
|<label>|ドロップダウンリストの説明文（ラベル）を定義します。for属性で<select>のidと関連付けます。アクセシビリティ（使いやすさ）のために重要です。|

select要素にname属性を付けることは、フォームを送信してサーバー側でデータを受け取るために必須

**name属性の役割**
1. データの識別子:

フォームが送信されたとき、ブラウザはユーザーが選択したoptionのvalue属性の値をサーバーに送ります。

このとき、送られるデータは「name属性の値 = 選択されたvalue属性の値」というペアになります。

例: select name="fruit"でoption value="apple"が選ばれた場合、サーバーには「fruit=apple」というデータが送られます。

2. サーバーでの利用:

PHP, Python, Rubyなどのサーバーサイドのプログラミング言語は、このnameを使ってデータを取り出し、処理します。

3. nameがないとどうなるか

name属性がない場合、ユーザーが選択を行っても、その選択肢のデータはフォームと一緒にサーバーへ送信されません。

### なんか
```JavaScript
import React, { useState, useEffect } from 'react'; // EeactをReactに修正

// Tailwind CSSを使用し、シンプルな家計簿入力フォームを作成します
export default function App() {
  // ★Hooksのセッター関数名を一般的な命名規則（setXXX）に修正しました。
  // useXXXという名前はカスタムHookのために予約されています。
  const [amount, setAmount] = useState(0);        // 金額入力欄
  const [purpose, setPurpose] = useState('');     // 使用用途の入力欄
  const [type, setType] = useState("expence");    // 収入(income)か支出(expence)の入力欄
  const [data, setData] = useState([]);           // 保存されたデータの配列
  
  // NOTE: ここにFirestoreなどのデータ取得処理が入りますが、今回は空のままにします。
  useEffect(
    () => {
      // データの初期ロードや購読処理などを記述
    }, []
  );

  // イベントハンドラは、イベントオブジェクト (e) をそのまま受け取るように修正
  const handleAmountChange = (e) => {
    // 入力値は文字列なので、Number()で数値に変換して保存
    setAmount(Number(e.target.value));
  }

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  }

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleSaveData = () => {
    // データを保存するロジックをここに記述します
    const newData = {
      id: Date.now(), // 一時的なID
      amount: amount,
      purpose: purpose,
      type: type,
      date: new Date().toLocaleDateString('ja-JP'),
    };
    
    // 既存のデータ配列に新しいデータを追加
    setData(prevData => [...prevData, newData]);

    // 入力欄をクリア
    setAmount(0);
    setPurpose('');
    setType('expence');
    
    console.log('保存されたデータ:', newData);
  }

  return(
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter']">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">💸 家計簿 💸</h1>

        {/* フォームセクション */}
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-700">入力欄</h2>
          
          {/* 金額入力 */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">金額 (円)</label>
            <input
              id="amount"
              type="number" // 数字入力に適切なタイプに変更
              value={amount}
              placeholder="0"
              // イベントオブジェクト (e) をそのまま渡すシンプルな記述に変更
              onChange={handleAmountChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          {/* 用途入力 */}
          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-600 mb-1">用途</label>
            <input
              id="purpose"
              type="text"
              value={purpose}
              placeholder="食費、給料、交通費など"
              onChange={handlePurposeChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          {/* 支出・収入の選択 */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-600 mb-1">カテゴリ</label>
            <select 
              id="type" 
              name="type" 
              value={type}
              onChange={handleTypeChange}
              className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-150"
            >
              <option value="expence">支出</option>
              <option value="income">収入</option>
            </select>
          </div>
          
          {/* 保存ボタン */}
          <button 
            onClick={handleSaveData}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md active:shadow-none active:translate-y-0.5 disabled:opacity-50"
          >
            保存
          </button>
        </div>
        
        {/* データ表示セクション */}
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">履歴</h2>
            <ul className="space-y-3">
                {data.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">まだデータがありません。</p>
                ) : (
                    data.map((item) => (
                        <li 
                            key={item.id} 
                            className={`flex justify-between items-center p-4 rounded-lg shadow-sm border-l-4 ${item.type === 'income' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
                        >
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-800">{item.purpose}</span>
                                <span className="text-xs text-gray-500">{item.date}</span>
                            </div>
                            <span className={`text-lg font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {item.type === 'income' ? '+' : '-'} {item.amount.toLocaleString()} 円
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
        
        
      </div>
    </div>
  );
}
```
