# Intelligent Blocker

悪性サイトをブラックリストやドメイン情報から検知し，ユーザが悪性サイトに接するリスクを軽減できるFirefox対応のアドオン機能である．

## 説明

本アドオンは悪性サイト，またはその可能性が高いサイトをブラックリストや予測機能を用いて解析し，アクセスする前にその旨を通知するものである．これにより，ユーザが悪性サイトに接触するリスクを軽減することができる．本機能のアルゴリズムは以下の[決定木図](https://github.com/akazs/MWS2019_F.SE#%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0)で表すことができる．

1. ユーザが一時的に許可するユーザホワイトリストにURLが登録済みで，かつ登録から一定期間内であればアクセスを許可する．
1. 含まれていない場合は，そのURLがブラックリストに含まれている場合にはアクセスの前に警告画面に遷移する．ブラックリストに含まれていない場合はドメイン情報をもとに悪性ドメインの可能性があるかを予測する．
1. 悪性ドメインの可能性がある場合はホワイトリストを参照する．ホワイトリストに含まれている場合はアクセスを許可し，含まれていない場合は警告画面を表示する．
1. 悪性ドメインの可能性が低い場合は，その通信がhttpかどうかを調べる．httpの場合は注意画面で表示する．httpsの場合は証明書期限を調べ，証明書の期限が90日より短い場合は警告画面を表示し，それより長い場合はアクセスを許可する．

### アルゴリズム
![][algorithm]

[algorithm]:https://github.com/akazs/MWS2019_F.SE/blob/master/algorithm.png

## 実行環境(2019/09/30現在)

- Firefox(69.0.1)

## インストール

以下に[インストールのデモアニメーション](https://github.com/akazs/MWS2019_F.SE#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%AE%E3%83%87%E3%83%A2)があるので，説明と一緒に参考にして下さい．

1. 保存したいディレクトリ下で次のコマンドを実行する．`$ git clone https://github.com/akazs/MWS2019_F.SE.git`

1. Firefoxを開き，URLバーに`about:debugging#/runtime/this-firefox`と入力する．

1. 画面内の`一時的なアドオン読み込み中...`(for English ver. `Load Temporary Add-on...`)ボタンを押し，先ほどcloneしたディレクトリの`background.js`を選択して，開く．

1. `Intelligent Blocker`というアドオンが追加されていれば，インストール成功．

### インストールのデモ
![][install_demo]

[install_demo]:https://github.com/akazs/MWS2019_F.SE/blob/master/install_demo.gif

## 実行のデモ

それぞれのデモでは，対象となるサイトへアクセスする前に警告を出すことに成功している．また，[上記の決定木図](https://github.com/akazs/MWS2019_F.SE#%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0)の通り，警告画面を対象サイトごとに変更することに成功している．

### ブラックリストに載っているドメインの時のデモ

ブラックリストに載っているドメインを検索しようとした時のデモである．
以下のデモでは，`http://081.co.uk`というphisingサイトへのアクセスを試みている．

 **上記のサイトはブラックリストに載っている本当のphishingサイトであるため，アクセスには細心の注意を払って下さい．**

![](https://github.com/akazs/MWS2019_F.SE/blob/master/blacklist_demo.gif)

### http通信を使用しているサイトの時のデモ

http通信を使用しているサイトにアクセスしようとしている時のデモである．
以下では，`http://example.com`というhttp通信を使用しているサイトへのアクセスを試みている．

![](https://github.com/akazs/MWS2019_F.SE/blob/master/http_demo.gif)

### 悪質なサイトである可能性がある時のデモ

我々のアルゴリズムで悪質なサイトである可能性があるドメイン名であると判断されたサイトにアクセスしようとしている時のデモである．
以下では，`https://fd7fs7fadf7fd.com`という架空のドメインではあるが，我々のアルゴリズムで悪性サイトのドメインであると判断したものへのアクセスを試みている．

悪性であると判断するアルゴリズムは次の3つの特徴に着目している．
```
- 証明書の有効期間が90日より短いこと
- ドメインが10文字以上であること
- ドメインに英数字が混在していること
```
1つ目の`証明書の有効期間が90日より短いこと`という特徴のうち，`有効期間`に着目したのは，["Hunting Malicious TLS Certificates with Deep Neural Networks"](https://dl.acm.org/citation.cfm?doid=3270101.3270105)を参考文献としている．この文献から今回はFirefoxアドオンから取得可能なSSL証明書の有効期間の情報を用いた．そして，その期間を`90日以内`としたのは，Let’s Encryptなど代表的なフリー証明書の有効期間がデフォルトで90日であるためである．

2つ目および3つ目の特徴については["A Classification Method of Unknown Malicious Websites
Using Address Features of each Network Address Class"](https://www.y-nakamr.net/research/ic/iwin2017kanazawa.pdf)を参考文献としている．

![](https://github.com/akazs/MWS2019_F.SE/blob/master/predict_demo.gif)

## ライセンス

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## 製作者

- [akazs](https://github.com/akazs)
- [wanidon](https://github.com/wanidon)
- [takemr](https://github.com/takemr)
- [Maxcafe](https://github.com/Maxcafe)
- [kzk-IS](https://github.com/kzk-IS)
- [kodai-sato](https://github.com/kodai-sato)

### アドバイザー

[矢内直人(大阪大学 大学院情報科学研究科 セキュリティ工学講座(藤原研究室) 助教)](http://www-infosec.ist.osaka-u.ac.jp/~yanai/)
