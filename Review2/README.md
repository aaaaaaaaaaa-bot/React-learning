# APIの復習

## APIを持ちたwebサイト

''' JavaScript
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
'''

fetchでURLからデータを取得したら.thenに行く

もしなんらかのエラーで.thenに進めない場合.catchでエラー処理を行う

今は他の書き方が主流らしいため今後変える