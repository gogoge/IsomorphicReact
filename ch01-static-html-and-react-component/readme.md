# Chapter 01 Static HTML and React Component

## 使用技術
- React
- Express server
- Webpack

## 安裝

```
yarn add express react react-dom babel-loader babel-core babel-preset-react babel-preset-es2015
```

## 簡介
React isomorphic 指的是當Browser 輸入網址時，由Server 產生對應的靜態 html 後，將React component mount到指定的 html tag上，Browser取得後可以直接顯示，不需要再作任何計算。

## 本章目標
- 用Express建立server
- 設定Express，當Browser連上server後，產生(render)一串html字串
- 將React component 插入html
- 回傳給Browser


## 直接看結果

```
yarn
webpack
babel-node ./server/server.js
```

1. 安裝dependency
2. build client Javascript bundle
3. 開啟server
4. 在brownser連到 http://localhost:3000/
5. 會先看到 server render字串 ，隨後變成client render ，

> 在console 會有 warning
> 為了展示server render有成功，故意使server render內容與client render不一致，這不是正常的使用方式，所以React會跳warning

## 遭遇困難

### 如何將網址中的sub dir對應到 server本機的dir path
如：server的本機path是 `base/server`  但我們需要建立一個 http://xxx/dist 對應 base/dist 的規則

> 用nodejs原生的 `path.join` 或 `path.resolve`
> 配合express的static method
> app.use('/dist', express.static(`${path.join(__dirname, '..')}/dist`))
> app.use('/dist', express.static(`${path.resolve(__dirname, '..')}/dist`))


### renderToString is not a function
新版react，把renderToString 和 renderToStaticMarkup移到`react-dom/server`

```
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
```

也可以改用renderToStaticMarkup`，`可以產生比renderToString更少屬性的html

###  app.use中的middleware，若沒有 res.send() 等回傳行為，記得next() 把控制權交回，才不會卡著直到timeout


