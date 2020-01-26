// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { genderBad } from './gender'
import { RenderPop, flyModal } from './RenderPop'
import guideImg  from './img/6.png'
import { Button, Switch, Modal, List, InputItem, Slider, WingBlank, Stepper } from 'antd-mobile';
function Example() {
  const [day, setDay] = useState(0);
  const [config, setConfig] = useState({
    row: 50,
    col: 50,
    //感染概率 2 - 10
    percent: 10,
    runPercent: 10,
    allBad: 1,
    fly: true,
    // 飞机距离为 50
    flyDir: 50,
    travel: true,
    // 高铁距离为 10
    highTravelDir: 10,
    way: true,
    // 口罩
    mask: false,
    // 聚集
    gather: false,
    // 在家自我隔离
    home: 0,
    // 高速路距离为 5
    highWayDir: 5,
    showPop: false,
    speed: 1
  })
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(genderBad({
    config,
    setConfig
  }));
  const [guide, setGuide] = useState(true)
  const [history, setHistory] = useState({
    visible: false,
    content: []
  })
  const divEle = count.map((col, index) => {
    const person = col.map((val, index2) => {
      const key = `${index}-${index2}`
      const className = val.healthy ? 'person' : `person ${val.name}`
      return <div className={className} key={key}></div>
    })
    return <div className='split' key={index}>{person}</div>
  })
  const savedCallback = useRef();
  const [start, setStart] = useState(false);
  // 演变
  useEffect(() => {
    savedCallback.current = (id) => {

      if(config.allBad >= config.row * config.col) {
        console.log('清除定时器')
        setStart(false)
        clearInterval(id);
        const saveItem = localStorage.saveItem ? JSON.parse(localStorage.saveItem) : []
        saveItem.length = 5
        saveItem.unshift({
          day: day+1,
          count,
          config
        })
        localStorage.saveItem = JSON.stringify(saveItem)
      }
      // 遍历每个人，根据演变规则演变
      count.forEach(col => {
        col.forEach(val => {
          val.change()
          val.run()
        })
      })
      setCount([...count])
      let start = 0
      count.flat(5).forEach(val => {
        if(val.name === 'bad')
          start++
      }, 0)
      // config.allBad = start
      setConfig({
        ...config,
        allBad: start
      })
      setDay(day+1)
    }
  });
  useEffect(() => {
    if(!start) { return }
    console.log('运行定时器')
    const id = setInterval(tick, 1000 / config.speed)
    function tick() {
      savedCallback.current(id);
    }
    return () => {
      if(savedCallback.current) {
        clearInterval(id);
      }
    }
  }, [config.speed, start])
  function clickStart() {
    console.log('start')
    setDay(0)
    setCount(genderBad({
      config,
      setConfig
    }))
    setConfig({
      ...config,
      allBad: 1
    })
    setStart(true)
  }
  return (
    <header className="App-header">
      <Button type="primary" onClick={() => clickHistory(setHistory)}>查看历史数据</Button>
      <Button className='bottom-btn' onClick={() => setConfig({
        ...config,
        showPop: true
      })}>设置演变属性</Button>
      <h3>病毒演化模拟器</h3>
      {renderPlane({
        count,
        config,
        setConfig,
        day
      })}
      <div>
          {divEle}
      </div>
      {RenderPop({
        count,
        config,
        setConfig
      })}
      {
        flyModal({
          title: '历史数据',
          visible: history.visible,
          setVisible: () => {
            setHistory({
              ...history,
              visible: false
            })
          },
          content: history.content.map((val, index) => {
              if(!val) return ''
              return (<div key={index}>
                飞机管制{val.config.fly ? '关' : '开'}，
                高铁管制{val.config.travel ? '关' : '开'}，
                高速管制{val.config.way ? '关' : '开'}，
                个体{val.config.mask ? '普及' : '未普及'}戴口罩,
                人员聚集{val.config.gather ? '管制' : '未管制'}，
                自我隔离百分比：{val.config.home * 10} %,
                耗时{ val.day }目<hr/></div>)
          })
        }) 
      }
      {
        flyModal({
          title: '',
          visible: guide,
          setVisible: () => {
            setGuide(false)
          },
          content: (<img src={guideImg} alt='' style={{ width: '100%' }}/>)
        }) 
      }
      <p>本应用数据非实际数据，只做娱乐用途</p>

      <Button type="primary" className='history'  disabled={start} onClick={() => clickStart()}>{start ? '正在演变' : '开始演变'}</Button>
    </header>
  );
}
function clickHistory(setHistory) {
  const saveItem = localStorage.saveItem ? JSON.parse(localStorage.saveItem) : []
  setHistory({
    content: saveItem,
    visible: true
  })
  console.log(saveItem)
}
function renderPlane(props) {
  return (
  <section>
    <p>时间：{props.day} 目</p>
    <p>个体数：{props.config.row * props.config.col} 人</p>
    <p>传染概率：{props.config.percent} %</p>
    {/* <p>飞机管制：{props.config.fly ? '无' : '有'}</p>
    <p>高铁管制：{props.config.travel ? '无' : '有'}</p>
    <p>高速管制：{props.config.way ? '无' : '有'}</p> */}
  </section>)
}
function guideModal() {
  //guideImg
  return flyModal({
    title: '',
    visible: true,
    setVisible: () => {
    },
    content: (<img src={guideImg} alt='' style={{ width: '100%' }}/>)
  }) 
}
function App() {
  return (
    <div className="App">
      { Example() }
    </div>
  );
}

export default App;
