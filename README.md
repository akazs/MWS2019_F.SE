# Intelligent Blocker

悪性サイトをブラックリストやドメイン情報から検知し，ユーザが悪性サイトに接するリスクを軽減できるFirefox対応のアドオン機能

## 説明

本アドオンは悪性サイト，またはその可能性が高いサイトをブラックリストや予測機能を用いて解析し，アクセスする前にその旨を通知するものである．これにより，ユーザが悪性サイトに接触するリスクを軽減することができる．本機能のアルゴリズムは以下の決定木図で表すことができる．まずユーザが一時的に許可するユーザホワイトリストにURLが登録済みで，かつ登録から一定期間内であればアクセスを許可する．含まれていない場合はそのURLがブラックリストに含まれている場合はアクセスの前に警告画面に遷移する．ブラックリストに含まれていない場合はドメイン情報をもとに悪性ドメインの可能性があるかを予測する．悪性ドメインの可能性がある場合はホワイトリストを参照しホワイトリストに含まれている場合はアクセスを許可し，含まれていない場合は警告画面を表示する．悪性ドメインの可能性が低い場合は，その通信がhttpかどうかを調べ，httpの場合は注意画面で表示する．httpsの場合は証明書期限を調べ，証明書の期限が90日より短い場合は警告画面を表示し，それより長い場合はアクセスを許可する．

## デモ

![](https://github.com/akazs/MWS2019_F.SE/blob/master/demo_test.gif)

## 実行環境(2019/09/30現在)

- Firefox(69.0.1)

## インストール

1. 保存したいディレクトリ下で以下のコマンドを実行する．

`$ git clone https://github.com/akazs/MWS2019_F.SE.git`

1. Firefoxを開き，URLバーに

`about:debugging#/runtime/this-firefox`

と入力する．

1. 画面内の`一時的なアドオン読み込み中...`(for English ver. `Load Temporary Add-on...`)ボタンを押し，先ほどcloneしたディレクトリの`background.js`を選択して，開く．

1. `Intelligent Blocker`というアドオンが追加されていれば，インストール成功．

## ライセンス

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## 製作者

- [akazs](https://github.com/akazs)
- [wanidon](https://github.com/wanidon)
- [takemr](https://github.com/takemr)
- [Maxcafe](https://github.com/Maxcafe)
- [kazukiiwahana](https://github.com/kazukiiwahana)
- [kodai-sato](https://github.com/kodai-sato)

### アドバイザー

[矢内直人(大阪大学 大学院情報科学研究科 セキュリティ工学講座(藤原研究室) 助教)](http://www-infosec.ist.osaka-u.ac.jp/~yanai/)
