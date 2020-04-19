## react-router-concent
连接`concent`与`react-router`，让你的`concent`应用完美接入`react-router`.

## 核心组件与api

### 使用方法1：ConnectRouter
在app顶层实例一个ConnectRouter，让`concent`连接上`react-router`
* {boolean} callUrlChangeOnInit=false
* {(history:object)=>{}} connected 连接上router的回调函数

```js
// 设置callUrlChangeOnInit为true时，
// 由路由切换导致的挂载上的组件，如果该组件定义了$onUrlChanged，则初次挂载的时候就会触发器$onUrlChanged函数的执行
<ConnectRouter callUrlChangeOnInit={true} />

// callUrlChangeOnInit默认是false，
// 此种情况，定义了$onUrlChanged的cc类在初次挂载的时候，不会触发$onUrlChanged函数的执行
// 只有在存在期间，如果用户反复点同一个路由url，会触发$onUrlChanged函数的执行
<ConnectRouter  />
```

### 使用方法2：createHistoryProxy

```ts
createHistoryProxy: (history: RouterHistory, callUrlChangeOnInit?:boolean)
```

在顶层容器里，只会初始化一次的地方掉用`createHistoryProxy`

### Link
负责跳转匹配路径规则的路由
* {string} prop.to 要跳转的路由路径
* {object} props.?style 样式
* {boolean} props.?stop=true, 默认是true，触发调用e.stopPropagation
* {(to:string)=>{}} props.?onClick 点击后的触发回调函数，第一位参数是定义的路径`to`

```js
import { Link } from 'react-router-concent';

<Link to="/user/:id" style={{border:1px}}>
```
### history
除了`Link`，用户也可以使用history直接跳转或者执行其他操作，api与`react-router`提供的完全保持一致
* history.push(path:string)，跳转到某个路径的路由页面
* 其他history.*** 参考`react-router`的提供与实现

```js
import { history } from 'react-router-concent';

<div onClick={()=>history.push('/path')}>点我跳转</div>
```

### cc类的扩展函数`$$onUrlChanged`
在cc类`setup`里设定事件`onUrlChanged`的监听函数，当调用了`history.push`、`history.goBack`，`history.goForward`、`history.replace`的时候, 如果对应的组件还处于存在期，`concent`会触发该函数

```js
@register()
class Foo extends React.Component{
  $$setup(ctx){
    ctx.on('onUrlChanged', ()=>{
      // do something here like initPage
    });
  }
}

<Route path="/user/:id" component={Foo} />
```

### 关于store
启动`concent`之后，如果配置了路由，则history模块下的所有操作都将状态同步到了store的`$$CONCENT_ROUTER`模块下，可以在console里打开输入sss回车并查看

```js
import { run, configureRoute } from 'react-router-concent';

// 启动concent
run();

//配置路由，连击路由到store
configureRoute();
```

## ✨使用范例，[在线示例点我](https://stackblitz.com/edit/cc-react-router-concent?file=index.js)
```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConnectRouter, history, Link } from 'react-router-concent';
import { run, register, CcFragment } from 'concent';

run();

class User extends Component {
  $$setup(ctx) {
    ctx.on('onUrlChanged', () => {
      console.log(params);
      this.init('onUrlChanged');
    });

    // mock componentDidMount
    ctx.effect(() => {
      this.init('componentDidMount');
    }, []);
  }
  init = (by) => {
    console.log('%c init User, triggered by ' + by, 'color:red; border:1px solid red');
  }
  render() {
    return (
      <div style={{ border: '1px solid blue', margin: '19px' }}>
        <h3>user</h3>
      </div>
    );
  }
}
const User_ = register('User')(User);

class UserDetail extends Component {
  $$setup(ctx) {
    ctx.on('onUrlChanged', () => {
      console.log(params);
      this.init('onUrlChanged');
    });

    ctx.effect(() => {
      this.init('componentDidMount');
    }, []);
  }
  init = (by) => {
    console.log('%c init UserDetail, triggered by ' + by, 'color:red; border:1px solid red');
  }
  render() {
    return (
      <div>
        <h3>user detail</h3>
      </div>
    );
  }
}

const UserDetail_ = register('UserDetail')(UserDetail);

const setup = ctx => {
  ctx.on('onUrlChanged', (params, action) => {
    ctx.setState({ msg: 'url changed ' + Date.now() });
  });
}
const iState = { msg: '' };

const F = () => (
  <CcFragment register={{setup,state:iState}} render={ctx => {
    return <h1>fragment msg: {ctx.state.msg}</h1>
  }} />
);

function FnComp(){
  const ctx = useConcent({setup,state:iState});
  return <h1>fragment msg: {ctx.state.msg}</h1>
}

class Layout extends Component {
  render() {
    console.log('Layout Layout');
    return (
      <div>
        <div onClick={() => history.push('/user')}>go to user page</div>
        <div onClick={() => history.push('/user/55')}>go to userDetail page</div>
        {/** 可以基于history主动push，也可以使用Link */}
        <Link to="/user" onClick={to => alert(to)}>to user</Link>
        <div onClick={() => history.push('/wow')}>fragment</div>

        <Route path="/user" component={User_} />
        <Route path="/user/:id" component={UserDetail_} />
        <Route path="/wow" component={F} />
        <Route path="/fn-comp" component={FnComp} />
      </div>
    )
  }
}

const App = () => (
  <BrowserRouter>
    <div id="app-root-node">
      <ConnectRouter />
      <Route path="/" component={Layout} />
    </div>
  </BrowserRouter>
)
ReactDOM.render(<App />, document.getElementById('root'));
```
