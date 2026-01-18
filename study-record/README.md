#　勉強記録アプリ

## 追加する機能

|機能|必要な技術|
|---|---|
|勉強内容の記録|・useStateでタイトルと内容を管理 ・inputとtextareaタグで入力フォームを作成|
|勉強時間の記録|・タイムスタンプを記録する機能（例：new Date()） ・useStateで時間を管理する機能|
|勉強時間の視覚化|・チャートライブラリ（例：Chart.js） ・記録された時間を集計してグラフに反映させるロジック|
|項目別のまとめ|・useStateで項目（タグ）を管理 ・selectタグやinputタグで項目を選択/入力するUI|
|記録の保存|・localStorage.setItem()でデータを保存 ・**JSON.stringify()**でオブジェクトを文字列に変換|
|過去の記録の表示|・localStorage.getItem()でデータを取得 ・**JSON.parse()**で文字列をオブジェクトに変換 ・mapでリスト表示|
|削除機能|・filterメソッドで特定の記録をリストから削除するロジック|

#### メモ

e.targetはイベントが発生したDOM要素（input要素など）を指します

e.target.valueでDOM要素(input要素など)のvalueの値

e.valueはない

### inputとlabelを縦に並べる方法

labelとinputはデフォルトでインライン要素なので、横に並んでしまいます

CSS上で下記のように操作する
```CSS
label, input {
  display: block;
}
```

### textareaの大きさの調整(HTML)

HTMLのtextareaタグには、**rowsとcols**という属性があり、これらを使って初期の大きさを設定できます。

rows: テキストエリアの表示行数を指定します。

cols: テキストエリアの**表示列数（文字数）**を指定します。

使用例
```HTML
<textarea rows="10" cols="50"></textarea>
```

## オブジェクトとは

### Props(プロップス)

Reactのコンポーネントが互いにやり取りする際にpropsと呼ばれるオブジェクトを用いる

親コンポーネントは子コンポーネントへ属性としてのデータを渡すと子コンポーネントはそのデータをpropsというオブジェクトとして受け取ります

### State(状態)

コンポーネント内でデータを保持し、その変更によってコンポーネントを再レンダリングするためのオブジェクトです

#### オブジェクトへのデータの保存方法

オブジェクトは「プロパティ名: 値」のペアでデータを格納します

#### ※Stateの情報を直接変更してはいけない

ReactのStateに保持されたオブジェクトは、直接変更してはいけません。これをミューテーションと呼びます(これはダメ)

正しい更新方法は、新しいオブジェクトを作成することです。スプレッド構文（...）を使うと、元のオブジェクトのプロパティをコピーして、新しいオブジェクトを簡単に作れます
```JavaScript
// ❌ 悪い例（ミューテーション）
const [person, setPerson] = useState({ name: '太郎', age: 25 });
person.age = 26; // 直接変更
setPerson(person); // Reactは変更を検知しない

// ✅ 良い例（新しいオブジェクトを作成）
setPerson({ ...person, age: 26 }); // スプレッド構文でコピーして更新
```

### localstorageとは

localStorageは、ウェブブラウザにデータを保存する機能

これまでuseStateでデータを扱ってきましたが、**useStateに保存されたデータは、ブラウザを閉じたりページを再読み込みしたりすると消えてしまいます。**

localStorageは、ブラウザにデータを保存することで、この問題を解決します。

localStorageには、**主に3つの基本的なメソッド**があります。

localStorage.setItem(キー, 値): データを保存します。**値は必ず文字列でなければなりません。**
```JavaScript
localStorage.setItem('username', 'Alice')
```
のように使います。

localStorage.getItem(キー): 保存したデータを取得します。
```JavaScript
const name = localStorage.getItem('username');
```
localStorage.removeItem(キー): 保存したデータを削除します。

### JSON.stringify() と JSON.parse()

localStorageは文字列しか扱えないため、JavaScriptの配列やオブジェクトを保存する際には、文字列に変換する必要があります。この変換に**JSON.stringify()**を使います。
```JavaScript
const records = [{ title: 'React' }];
localStorage.setItem('study_records', JSON.stringify(records));
```
逆に、localStorageからデータを取り出して、JavaScriptの配列やオブジェクトに戻す際は、**JSON.parse()**を使います。
```JavaScript
const storedRecords = localStorage.getItem('study_records');
const parsedRecords = JSON.parse(storedRecords);
// parsedRecords は JavaScriptの配列として使える
```
#### reduceメソッドとは

reduceは、**配列のすべての要素を順番に処理し、一つの値にまとめる**（「還元する」）ためのメソッドです。この「一つの値」は、数値、文字列、配列、オブジェクトなど、何でも構いません。

##### reduceの基本的な使い方

reduceは、以下の2つの引数を取ります。

「リデューサー関数（reduce function）」: 配列の各要素に対して実行される関数です。

初期値（initial value）: 処理の出発点となる値です。
```JavaScript
配列.reduce((アキュムレータ, 現在の値) => {
  // 処理内容
  return 次のアキュムレータ;
}, 初期値);
```
アキュムレータ（accumulator）: これまでの処理結果が蓄積される変数です。

現在の値（current value）: 配列から順番に取り出される各要素です。

使用例
```JavaScript
const numbers = [1, 2, 3, 4];

// `reduce`を使って合計を計算
const sum = numbers.reduce((accumulator, currentValue) => {
  console.log(`アキュムレータ: ${accumulator}, 現在の値: ${currentValue}`);
  return accumulator + currentValue;
}, 0); // 初期値は0

console.log(`合計: ${sum}`);
```
このコードを実行すると、reduceは以下のように動作します。

初期値0がaccumulatorに設定されます。

配列の最初の要素1がcurrentValueに渡されます。0 + 1 = 1が返されます。

返された1が次のaccumulatorになります。currentValueは2です。1 + 2 = 3が返されます。

返された3が次のaccumulatorになります。currentValueは3です。3 + 3 = 6が返されます。

返された6が次のaccumulatorになります。currentValueは4です。6 + 4 = 10が返されます。

配列の最後まで処理が終わったので、最終的な値10がsumに代入されます。

#### 1日あたりの合計時間の表示方法

**ステップ1：合計時間の計算**

日付との兼ね合いは置いといて,同じタイトル内での時間の合計を行う

1. reduceで合計の計算
```JavaScript
// record.entries という配列から、合計時間を計算
const totalMinutes = record.entries.reduce((total, entry) => {
    // total（合計）に、現在の entry の time を足し合わせる
    // ⚠️ entry.time は文字列なので、Number()で数値に変換！
    return total + Number(entry.time); 
}, 0); // 初期値は 0
```
2. 時間と分に変更する
```JavaScript
const totalHours = Math.floor(totalMinutes / 60); // 割り算の整数部分が「時間」
const remainingMinutes = totalMinutes % 60; // 剰余（余り）が「分」
```

##### reduceとmapの違い

これらのメソッドは、配列の各要素に対して処理を行うという点では共通していますが、**「最終的に何を生み出すか」** が最大のポイント

###### map():変換

map() は、配列の各要素を変換（マッピング） し、新しい配列を返すために使います。元の配列の要素数と、返される新しい配列の要素数は必ず同じになります。

**目的**

「元の配列の形を変えずに、中身だけを新しいルールで作り直したい」

**動きのイメージ**

元の配列があります。

各要素を箱（関数）に通して、中身を別の形に変換します。

変換された要素が、新しい配列の箱に順番に格納されます。

**具体例**

数字の配列を、それぞれ2倍した新しい配列を作りたい場合。
```JavaScript
// 元の配列 (Array)
const numbers = [1, 2, 3, 4];

// mapを使って各要素を2倍に変換
const doubled = numbers.map(num => num * 2);

// 結果も配列になり、要素数は変わらない
// doubled は [2, 4, 6, 8]
```
##### reduce()：集約

reduce() は、配列のすべての要素を一つに集約（まとめる） し、単一の値（数値、オブジェクト、新しい配列など）を返すために使います。

**目的**

「配列全体を使って、一つの結果（合計値、最も大きい値、複雑なオブジェクトなど）を作り出したい」

**動きのイメージ**

アキュムレータ（蓄積する箱） と呼ばれる初期値（または最初の要素）を用意します。

配列を最初から最後まで順番に見ていきます。

現在の要素をアキュムレータに「加えて」いき、アキュムレータを更新します。

すべての要素を見終わった後、最後に残ったアキュムレータの値が最終的な結果になります。

**具体例（合計値を求める）**

数字の配列の合計値を求めたい場合。
```JavaScript
// 元の配列
const numbers = [1, 2, 3, 4];

// reduceを使って合計値を計算
// (accumulator, currentValue) => ...
const sum = numbers.reduce((total, num) => {
    // 蓄積値(total)に現在の要素(num)を足して、新しい蓄積値を返す
    return total + num;
}, 0); // 初期値 0 からスタート

// 結果は単一の値になる
// sum は 10
```

reduce()を使った「グループ化（振り分け）」の仕組み
```JavaScript
const fruits = [
    { name: "りんご", color: "赤" },
    { name: "バナナ", color: "黄" },
    { name: "いちご", color: "赤" },
];

const groupedByColor = fruits.reduce((accumulator, fruit) => {
    // 1. 現在処理しているフルーツの色（例: "赤"）を取得
    const colorKey = fruit.color;

    // 2. if文（条件）を使って振り分けのロジックを実装
    //[]の中の色が存在してればそこにフルーツを入れる。そうでなければ新しい引き出しを作る
    if (accumulator[colorKey]) {
        // もしアキュムレータにその色(colorKey)のプロパティが既にあれば、
        // 既存の配列に現在のフルーツを追加
        accumulator[colorKey].push(fruit);
    } else {
        // もしアキュムレータにその色のプロパティがなければ、
        // 新しい配列を作成し、現在のフルーツを最初の要素として追加
        accumulator[colorKey] = [fruit];
    }

    // 3. 更新されたアキュムレータを返す（次のループに引き継ぐ）
    return accumulator;
}, {}); // 初期値は空のオブジェクト {}
// -> この空のオブジェクトが「赤」や「黄」などのプロパティを持つ入れ物になる

console.log(groupedByColor);
```

#### アクセス ([])：オブジェクトの中身を取り出す/格納する

[]（ブラケット記法）は、オブジェクトの特定のプロパティ（キー）にアクセスするために使います。



## CSSとは(余談)

CSSは Cascading Style Sheets（カスケーディング・スタイル・シート）の略です。

HTMLがウェブページの「骨組み」や「内容」を作るのに対し、CSSはウェブページの「見た目」や「装飾」を定義します。

例えば、文字の色を変えたり、要素の大きさを調整したり、配置を変えたりするのがCSSの役割です。

CSSの基本的な文法

CSSは、**「誰に、何を、どのように」**装飾するか、という文法で書かれます。

```CSS
セレクタ {
  プロパティ: 値;
  プロパティ: 値;
}
```
1. セレクタ: どのHTML要素を装飾するかを指定します。

h1:すべての\<h1>タグに適用

.クラス名:特定のクラスを持つ要素に適用

#ID名:特定のIDを持つ要素に適用

2. プロパティ: 変更したい見た目の項目（例：color、font-size）。

3. 値: プロパティに設定する具体的な内容（例：red、20px）。

例えば、h1タグの文字色を青色に変え、文字サイズを24ピクセルにするには、以下のように書きます。
```CSS
h1 {
  color: blue;
  font-size: 24px;
}
```
####　ReactにおけるCSSの運用方法

1. インラインスタイル

HTML要素のstyle属性に直接CSSのスタイルをJavaScriptのオブジェクトとして記述します。手軽ですが、再利用しにくいため、一時的な装飾によく使われます。
```JavaScript
<h1 style={{ color: 'blue', fontSize: '24px' }}>画像検索</h1>
```

2. CSSファイル

App.cssのような外部ファイルにCSSを記述し、Reactコンポーネントの先頭でインポートします。これが最も一般的な方法です。
```JavaScript
// App.js の先頭
import './App.css';

// App.css
h1 {
  color: blue;
  font-size: 24px;
}
```

3. CSSクラス

HTML要素にclassName属性を使ってクラス名を付与し、そのクラスに対してCSSを適用します。これにより、同じ見た目を複数の要素に適用したり、再利用したりできます。
```JavaScript
// App.js
<h1 className="main-heading">画像検索</h1>

// App.css
.main-heading {
  color: blue;
  font-size: 24px;
}
```

## 理想系
```JavaScript
import React, {useState,useEffect} from 'react';

// Tailwind CSSを適用するためのスタイリング
const InputStyle = "w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out";
const ButtonStyle = "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out";

export default function App() {
    const [title,setTitle] = useState(''); //学習記録(タイトル)保持用
    const [content,setContent] = useState('');//学習記録(学習内容)保持用
    const [records,setRecords] = useState([]); //学習記録保存用
    const [time,setTime] = useState(0);//時間記録用
    // 【修正箇所 2a】アラートの代わりにエラーメッセージを表示するためのStateを追加
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(
        () => {
            //localStorageに保存されているデータを取得
            const storedRecords = localStorage.getItem('study_records');
            //setRecodsに中身があれば
            if(storedRecords){
                //localStorageの中身を戻して配列に加える
                setRecords(JSON.parse(storedRecords));
            }
        },[]
    );

    const studyRecord_title = (e) => {
        setTitle(e.target.value);//学習記録(タイトル)の保持
    }

    const studyRecord_content = (e) => {//学習記録(学習内容)の保持
        setContent(e.target.value);
    }

    const recordDelate = (index) => {//削除ボタン
        const newRecord2 = records.filter((record,i) => i !== index)//indexが一致しないものだけにする//!==にすることで型まで一致してるか調べる

        setRecords(newRecord2);

        // localStorageも更新
        localStorage.setItem('study_records', JSON.stringify(newRecord2));
    }

    const saveRecord = () => { //学習記録保存
        // 【修正箇所 2b】保存処理開始時にメッセージをクリア
        setErrorMessage('');

        //タイトルと学習記録が入力されていない時は保存できないようにする
        if (title.trim() === '' || content.trim() === '') {
            // alert('タイトルと学習内容を入力してください'); // 使用禁止のため削除
            // 【修正箇所 2c】アラートの代わりにエラーメッセージを設定
            setErrorMessage('タイトルと学習内容を入力してください');
            return; // 処理を中断
        }
        let updatedRecords;

        // 保存時間を数値型に変換
        const studyTime = Number(time);

        const existRecord = records.find(record => record.title === title);//同じタイトルの物がないを調べる

        if(existRecord){//同じタイトルのものがある場合

            updatedRecords = records.map(record => {
            if (record.title === title) {
                return {
                    ...record,
                    entries: [...record.entries, {
                        content: content,
                        date: new Date().toLocaleDateString(),
                        time: studyTime,
                    }]
                };
            }
            return record;
            });

        }else{//同じタイトルの物がない場合
            // 新しい記録のオブジェクトを作成
            const newRecord = {
            title: title,
            entries: [{
                content: content,
                date: new Date().toLocaleDateString(), // 日付を記録
                time: studyTime,
                //勉強時間も追加
            }],
            };

            // 既存の記録配列に新しい記録を追加
            //recordsを直接変更しないようにするために新しく作る
            updatedRecords = [...records, newRecord];
        }
         // 新しい配列で状態を更新
        setRecords(updatedRecords);

        // localStorageに保存
        window.localStorage.setItem('study_records', JSON.stringify(updatedRecords));

        // 入力欄をクリア
        setTitle('');
        setContent('');
        setTime(0); // 時間もリセット
    }

    // 学習時間を "H時間M分" 形式にフォーマットするヘルパー関数
    const formatTime = (minutes) => {
        const totalMinutes = Number(minutes);
        const hours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;
        return `${hours}時間${remainingMinutes}分`;
    }


    return(
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
                <h1 className="text-3xl font-extrabold text-indigo-700 border-b-4 border-indigo-500 pb-2">学習記録アプリ</h1>

                {/* 【修正箇所 2d】エラーメッセージの表示エリア */}
                {errorMessage && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm" role="alert">
                        {errorMessage}
                    </div>
                )}

                <div className="space-y-4">
                    <label className="block text-lg font-semibold text-gray-700">タイトル</label>
                    <input
                        type = "text"
                        value = {title}
                        placeholder="例：Reactの基礎学習"
                        onChange = {studyRecord_title}
                        className={InputStyle}
                    />
                    <label className="block text-lg font-semibold text-gray-700 pt-2">学習内容</label>
                    <textarea
                        value = {content}
                        placeholder="今日学習した具体的な内容や進捗を記述"
                        onChange = {studyRecord_content}
                        rows="5"
                        className={InputStyle}
                    />
                </div>
                
                <div className="pt-2">
                    <label className="block text-lg font-semibold text-gray-700">
                        学習時間 ({formatTime(time)})
                    </label>
                    <input
                        type="range"
                        min="0" // 最小値
                        max="120" // 最大値 (2時間)
                        step="5" // 5分刻み
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer range-lg"
                    />
                    <p className="text-sm text-gray-500 mt-1">現在: {formatTime(time)}</p>
                </div>
                
                <button onClick = {saveRecord} className={ButtonStyle}>
                    記録を保存
                </button>

                <h2 className="text-2xl font-bold text-gray-800 pt-6 border-t mt-6">学習記録</h2>
                
                <ul className="space-y-8">
                    {records && records.length > 0 ? (
                        records.map((record,index) => {
                            // 合計学習時間の計算
                            const addTotalNumber = record.entries.reduce((sum ,entry) => {
                                return sum += Number(entry.time);
                            },0);
                            
                            // 日付ごとにエントリをグループ化
                            const entriesByDate = record.entries.reduce((acc,entry) => {
                                if (!acc[entry.date]) {
                                    acc[entry.date] = [];
                                }
                                acc[entry.date].push(entry);
                                return acc;
                            },{});

                            return (
                                <li key={index} className="border border-gray-200 p-4 rounded-xl shadow-sm bg-indigo-50">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold text-indigo-800">{record.title}</h3>
                                        <button 
                                            onClick={() => recordDelate(index)} 
                                            className="text-red-500 hover:text-red-700 text-sm font-semibold transition duration-150"
                                        >
                                            [タイトル全体を削除]
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        累計学習時間: <span className="font-mono font-semibold text-indigo-900">{formatTime(addTotalNumber)}</span>
                                    </p>

                                    {/* 日付ごとの記録表示 */}
                                    {
                                    Object.entries(entriesByDate).map(([date,entries]) => (
                                            <div key={date} className="mt-3 p-3 border-t border-indigo-200">
                                                <h4 className="text-md font-semibold text-gray-800 mb-2">日付: {date}</h4> 
                                                
                                                <div className="space-y-3 pl-2 border-l-2 border-indigo-400">
                                                    {entries.map((entry, entryIndex) => {
                                                            // 【修正箇所 1】ここで明示的に return が必要
                                                            return ( 
                                                                <div key={entryIndex} className="p-2 bg-white rounded-lg shadow-inner">
                                                                    <p className="text-gray-900"><span className="font-medium">内容:</span> {entry.content}</p>
                                                                    <p className="text-gray-500 text-sm"><span className="font-medium">時間:</span> {formatTime(entry.time)}</p>
                                                                </div>
                                                            ); // return の追加
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    )
                                    }
                                </li>
                            )
                        })
                    ) : (
                        <p className="text-gray-500 text-center py-4">まだ学習記録がありません。タイトルと内容を入力して保存してください。</p>
                    )}
                </ul>
            </div>
            {/* 永続化ストレージに関する注意 */}
            <p className="text-center text-xs text-gray-400 mt-8">
                ※このアプリケーションは一時的なデータ保存に`localStorage`を使用しています。
                共有や長期保存が必要な場合は、`Firestore`などの永続化データベースへの切り替えを推奨します。
            </p>
        </div>
    )
}
```
