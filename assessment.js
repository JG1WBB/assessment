'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assess');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
function removeAllChildlen(element) {
    while (element.firstChild) {//子要素があるとき削除
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = function(event){//user-name要素中でEnterキーを押したときも動かせるように定義
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}

assessmentButton.onclick = function () {//無名関数の定義
    const userName = userNameInput.value;
    console.log('ボタンが押された');

    if (userName.length === 0) {
        return;
    }
    //console.log(userName)

    removeAllChildlen(resultDivided);

    removeAllChildlen(tweetDivided);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');

    tweetDivided.appendChild(anchor);
    tweetDivided.appendChild(script);

    const header = document.createElement('h3');//新しい要素の作成
    header.innerText = '診断結果';
    resultDivided.appendChild(header);


};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];
function assessment(userName) {
    let sumOfCharCode = 0;//スコープ(関数内でしか有効でない変数)を定義
    for (let i = 0; i < userName.length; i++) {//条件は文字列の長さ
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);//文字列を配列とみなしi文字目の文字コードを足す
    }
    const index = sumOfCharCode % answers.length;//配列answersの長さ(数)
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);//正規表現
    return result;
}

/*
console.log(assessment('次郎'));
console.assert(
    assessment('次郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'//第一引数は正しい値、第二引数は間違っていたときに出すメッセージ
  );
  */
