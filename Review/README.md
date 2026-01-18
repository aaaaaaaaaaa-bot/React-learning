# Reactリハビリ

## 本日の内容

基本的な書き方およびuseStateなどの重要事項の確認

初期コードに対して追加で記載を行い,知識の回収・リハビリ

### 初期コードの内容

useStateを用いたリアルタイム入力？みたいなの

useState,onChangeにより自身の入力内容を下に即座に反映する.

onChangeのe.target.valueってなんだっけ

->e.targetはイベントが発生したDOM要素（input要素など）を選択してそのvalueを読み取る動作

んで今はsetText()で使われてるからその内容をtextに入れるってことになる.

## コードの追加

### 追加ボタンの作成

追加ボタンを押しても追加できないなんで？

->追加ボタンを押した際にe.target.valueをするとボタンのvalueをもらおうとしてundefinedになってしまうため

そのためtextをそのままstorageに入れ,storageを表示する.

複数個のstorageの要素を追加して記録するにはどうすればいいのか?

まず, const [storage, setStorage] = useState([]); []で配列にする

オブジェクトを使って追加する情報の管理をする.番号つけたり,場合によってはタグつけたり.(オブジェクトじゃなくてもsetStorage([...storage , text])で一応動かせるけど発展の余地がない)

んでstorageに入れた複数個の情報をstorage.mapで表示する.

mapの使い方に苦戦

->まずmapを使う時はjavaScriptなので{}で囲む

mapの中で使う変数は新たなitemなどにするstorageなどにするとややこしくなるしバグる

オブジェクトを作った時はitem.idとかitem.contentとかで分けてる

オブジェクトを作らなくても動作するようにはできるがオブジェクトのおかげでidの作成ができ,削除機能などの特定のものを指定した動作がやりやすい.

削除機能の追加(filter)

'''JavaScript

const deleteData = storage.filter((item) => item.id !== targetId)

'''

storage.filterでstorageの中のものを一つ一つ見る

んでstorageの中の一つ一つを(item)としておいてitemのidがtargetId(item.idを渡したやつ)と一致するかを確認する

一致したものは消す

で整理したデータをsetStorage(deleteData)で入れ直す.

ここでミスポイントitem.idなどの変数を関数に渡す際,その変数が変化するもの(idみたいな識別子となるもの)の場合アロー関数()=>使ってボタンが押された時に実行するようにしないと変数の受け渡しがうまくされない

更新時に実行されてしまい,特定のTime.nowwのような変動する変数をうまく受け渡せない.

オブジェクトを用いた複数の内容の保持

オブジェクト内に新たにamountという項目を作成し,textと同じ点順で入力欄,表示を行う.

inputタグのtype='number'に変更すれば数値を記入できる

合計金額の表示(reduce)

計算したい配列.reduce = ((合計保持の変数,一つ一つの値(ex.item.amount))=>{
    return = 合計の値　＋　一つ一つの値;
})

### useEffectとlocalstorage

useEffectの基本構文

'''JavaScript
useEffect(
    ()=>{
        //処理
    },[]
)
'''

[]は依存配列と言ってこの配列の中身が変更されたらuseEffectを実行するというもの

ここでlocalStorgaeというもの使うと[]に入れた変数が変更されたタイミングで中身をlocalstorageに入れてくれてそれに寄って再読み込みとかをした際にデータを復旧できる.

#### 再読み込みの仕方

localStorageに保存し,リロード時にデータをlocalStorageから呼び出すことでリロードしてもstorageの内容を保持できるようになる

しかしuseEffectの依存配列が[]空の状態(最初のみに起こる動作)で呼び出しを行うとstorageを[]からの配列で宣言している (const [storage,setStorage] = useState([]ここで空で宣言))ためそ

この情報をuseEffectでlocalStorageに保存してしまい,localStorageの中が空になり,うまくいかない

そこで

'''JavaScript
    const [storage, setStorage] = useState(() => {
    const storedRecords = localStorage.getItem('house_records');
    return storedRecords ? JSON.parse(storedRecords) : [];
  });
'''

定義自体に読み込む処理を加えることでlocalStorageからのデータの読み込みを行う

constの中のreturnで返された内容がstorageの中に入る

### ボタンの制御

ボタンが家計簿の全ての欄に入力がされてないと押せないようにした

''' JavaScript
// 「品目が空」 または 「金額が空」 なら true になる
const isInvalid = text === '' || amount === '';

// ボタン側
<button disabled={isInvalid}>追加</button>
'''

ボタンにdisabled属性を追加して条件を満たしてなければボタンが押せないようになっている.

