## react-router-concent
连接`concent`与`react-router`，让你的`concent`应用完美接入`react-router`.

## 核心组件与api
### ConnectRouter
在app顶层实例一个ConnectRouter，让`concent`连接上`react-router`
* {boolean} callUrlChangeOnInit=false
* {(history:object)=>{}} connected 连接上router的回调函数
```
// 设置callUrlChangeOnInit为true，
// 表示要让定义了$onUrlChanged的cc类一定会触发器$onUrlChanged函数的执行
<ConnectRouter callUrlChangeOnInit={true} />

// callUrlChangeOnInit默认是false，
// 此种情况，定义了$onUrlChanged的cc类在初次挂载的时候，不会触发$onUrlChanged函数的执行
// 只有在存在期间，如果用户反复点同一个路由url，会触发$onUrlChanged函数的执行
<ConnectRouter  />
```
### Link
负责跳转匹配路径规则的路由
* {string} prop.to 要跳转的路由路径
* {object} props.?style 样式
* {boolean} props.?stop=true, 默认是true，触发调用e.stopPropagation
* {(to:string)=>{}} props.?onClick 点击后的触发回调函数，第一位参数是定义的路径`to`
```
import { Link } from 'react-router-concent';

<Link to="/user/:id" style={{border:1px}}>
```
### history
除了`Link`，用户也可以使用history直接跳转或者执行其他操作，api与`react-router`提供的完全保持一致
* history.push(path:string)，跳转到某个路径的路由页面
* 其他history.*** 参考`react-router`的提供与实现
```
import { history } from 'react-router-concent';

<div onClick={()=>history.push('/path')}>点我跳转</div>
```
### cc类的扩展函数`$$onUrlChanged`
在cc类定义`$$onUrlChanged`函数，当调用了`history.push`、`history.goBack`，`history.goForward`、`history.replace`的时候, 如果对应的组件还处于存在期，`concent`会触发该函数
```
@register()
class Foo extends React.Component{
  $$onUrlChanged(){
    // do something here like initPage
  }
}

<Route path="/user/:id" component={Foo} />
```
### CcFragment使用`onUrlChanged`属性来监听url变化
```
const F = ()=><CcFragment onUrlChanged={()=>console.log('url changed')} render={()=><h1>fragment</h1>} />

//注意不要把此函数直接定义在component里，要不然会一直重复创建该组件
<Route path="/user/:id" component={F} />
```
### 关于store
history的所有操作都将状态同步到了store的`$$CONCENT_ROUTER`模块下，可以在console里打开输入sss回车并查看

## ✨使用范例，[在线示例点我](https://stackblitz.com/edit/cc-react-router-concent?file=index.js)
```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConnectRouter, history, Link } from 'react-router-concent';
import { run, register } from 'concent';

run();

class User extends Component {
  componentDidMount() {
    this.init('componentDidMount');
  }
  $$onUrlChanged(params, action, history) {
    console.log(params);
    this.init('$$onUrlChanged');
  }
  init = (by) => {
    console.log('%c init User, triggered by '+by, 'color:red; border:1px solid red');
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
  componentDidMount() {
    this.init('componentDidMount');
  }
  $$onUrlChanged(params, action, history) {
    console.log(params);
    this.init('$$onUrlChanged');
  }
  init = (by) => {
    console.log('%c init UserDetail, triggered by '+by, 'color:red; border:1px solid red');
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

const F = ()=><CcFragment onUrlChanged={()=>console.log('!!!!!!!!!!!!!!')} render={()=><h1>fragment</h1>} />

class Layout extends Component {
  render() {
    console.log('Layout Layout');
    return (
      <div>
        <div onClick={() => history.push('/user')}>go to user page</div>
        <div onClick={() => history.push('/user/55')}>go to userDetail page</div>
        {/** 可以基于history主动push，也可以使用Link */}
        <Link to="/user" onClick={to=>alert(to)}>to user</Link>
        <div onClick={() => history.push('/wow')}>fragment</div>

        <Route path="/user" component={User_} />
        <Route path="/user/:id" component={UserDetail_} />
        <Route path="/wow" component={F} />
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
ReactDOM.render(<App />, document.getElementById('root'))

```
