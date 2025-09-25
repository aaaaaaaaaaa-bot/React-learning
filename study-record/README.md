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
