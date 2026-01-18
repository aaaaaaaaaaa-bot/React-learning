# 家計簿

##　自分の力で作ったもの

###　機能

・内容と金額の保存

・記録の削除

#### つまずいた点

##### オブジェクト

オブジェクトは情報の一括管理を行えるもの

配列などに保存する情報の紐付けを行い,管理しやすくなる

またidを用いることで複数の情報を一括で扱える

名前(キー)と入れるものの名前が一致している場合省略できる

content: content, -> content,

##### map

mapは配列の情報を広げる

rerun文中に書くときは{}でくくる(JavaScriptのため)

<ul>
    {配列名.map((map内の適当な変数(配列ないの１つ１つのオブジェクトの意味)(ex : item)) => (
        <li>
            {item.content}
        </li>
    ))}
</ul>

mapでは情報の羅列<li></li>をたくさん作るため外側を<ul></ul>で囲む

<ul></ul>を用いることでmap内の表記を一括で管理できる

##### filter

idなどを参照し一致・不一致の判定により配列の内のオブジェクトの削除を行う

const 新しい配列 = 配列名.filter((item) => item.id !== ~~)

set~~~(新しい配列)

itemは配列内のオブジェクトを1つ1つ取るための変数

ボタンの注意点

onClick(関数名)だとweb読み込み時に実行されてしまう

onClick(() => 関数名)にする

###### localStorage

localStorageに保存できるのは文字列のみ

そのためJSON.stringifyを用いて文字列に変えて保存する

その後使用する際はJSON.parseで文字列から戻す

### TypeScriptへの移行

1. tsconfig.jsonを追加する.

2. interfaceの追加(引数の方の定義)

3. useStateに扱うものを教える

4. イベント引数へのe: changeEventの追加

useStateに渡すRecordData[]の意味

複数の情報を扱う配列(id,content,amount)これらのデータが要素ごとに揃ってるか(過不足なく)の判別を行ってくれる

localstorageに置いてあるデータを読み込むときにas RecordData[]としておくと読み込んだものが何かをtypeScriiptに教えてくれる

newData(オブジェクト)に対しても: RecordDataと型を明記すると今後の型追加時に抜けを防げる

イベント処理において(e)を用いてデータを読み込んでいたところにe: changeEvent<HTMLInputElemnet>としておくと<input>タグ専用となる

HTMLTextAreaElementを用いればtextareaでの入力を読み取ることができる


