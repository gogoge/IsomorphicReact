# Chapter 02 Add react-router to server and client render

## 使用技術
- React
- Express server
- Webpack
- React-router (new)

## 安裝

#### ch01

```
yarn add express react react-dom babel-loader babel-core babel-preset-react babel-preset-es2015
```

#### ch02

```
yarn add react-router
```

## 簡介
Router的功能是依request中的url，決定對應的回應方式   
除了express提供的router功能外，react-router也提供router功能  
react-router 提供兩種可選  
- pure client: hash routing  
- servern render: browser router (沒有hash `#`)  

## 本章目標
- 用Express建立server
- 設定Express，當Browser連上server後，產生(render)一串html字串
- 依router match的結果，產生不同的response string (new)
- 將React component 插入string
- 回傳給Browser
並且建立用於Rest API之用的router

## 直接看結果

```
yarn
webpack
webpack --config webpack.server.config.js  #(new)
babel-node ./server/server.js
```

1. 安裝dependency
2. build client Javascript bundle
3. build server Javascript bundle (new)
4. 開啟server
5. 在brownser連到 http://localhost:3000/
6. 會先看到 server render字串 ，隨後變成client render ，

> 在browser網址列輸入不同網址可以看到不同string
> `http://localhost:3000/` (root)
> `http://localhost:3000/A` (match A)
> `http://localhost:3000/T` (no match)
> `http://localhost:3000/api/api1` (rest api)

## 遭遇困難

### 當server code使用了webpack server config無法產生正確bundle

```
node: {
__filename: true,
__dirname: true,
},
 ```

 加入上面的config解決

 ### react-router在server side render會干擾API router

 因為react-router的express middleware是以`*`將所有url都套用react-router middleware  
 要將API的url區別出來可以用express.Router()

```
// 先套用apiRouter
const apiRouter = express.Router()
apiRouter.get('/tt', (req, res) => {
  res.json({a: 1, b: 2})
})
app.use('/api', apiRouter)

// 再套用 react-router SSR middleware
const serverRenderWithRouterMiddleware = (req, res) => {
  match({ routes, location: req.url }, (err, redirect, renderProps) => {
    sendRenderResult(req, res, html(renderProps))
  })
}
app.use(serverRenderWithRouterMiddleware)

 ```

 接著就可以用 `/api/api1` 的url去存取rest api

# 修改後，要bundle的檔案愈來愈多，需要script自動處理

每次都要執行的指令有3個
```
webpack
webpack --config webpack.server.config.js  #(new)
babel-node ./server/server.js
```

以npm script代替

```
  "scripts": {
    "start-server": "webpack && webpack --config webpack.server.config.js && node dist/server.bundle.js"
  },
```

以後就可以直接輸入 `npm run start-server` 自動處理
