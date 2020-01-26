
import { Button, Switch, Modal, List, InputItem, Slider, WingBlank, Stepper, Icon } from 'antd-mobile';
import React, { useState, useEffect, useRef } from 'react';
import maskImg from './img/1.jpg'
import flyImg from './img/2.jpg'
import travleImg from './img/3.jpg'
import wayImg from './img/3.jpeg'
import gatherImg from './img/4.jpeg'
import homeImg from './img/5.jpeg'
export function flyModal({
  title,
  content,
  visible,
  setVisible
}) {
  return (<Modal
    visible={visible}
    transparent
    maskClosable={false}
    title={title}
    style={{
      width: '90%'
    }}
    footer={[{ text: 'Ok', onPress: () => { setVisible() } }]}
    onClose={() => {
      setVisible()
    }}
  >
    <div>
      {content}
    </div>
  </Modal>)
}
export function RenderPop(props, checkState) {

  const [modalVisible, setModalVisible] = useState({
    fly: false,
    travel: false,
    way: false,
    mask: false,
    gather: false
  });
  return (<Modal
    popup
    visible={props.config.showPop}
    onClose={() => {
      props.setConfig({
        ...props.config,
        showPop: false
      })
    }}
    animationType="slide-up"
  > 
  { 
    flyModal({
      title: '飞机管制',
      visible: modalVisible.fly,
      setVisible: () => {
        setModalVisible({
          ...modalVisible,
          fly: false
        })
      },
      content: (<div>
        <div>飞机管制关：个体可乘坐飞机，随机与 相邻 50 坐标内的个体发生交换。</div>
        <br/>
        <div>飞机管制开：禁止个体乘坐飞机</div>
        <img src={flyImg} alt=''/>
      </div>)
    }) 
  }
  { 
    flyModal({
      title: '高铁管制',
      visible: modalVisible.travel,
      setVisible: () => {
        setModalVisible({
          ...modalVisible,
          travel: false
        })
      },
      content: (<div>
        <div>高铁管制关：个体可乘坐高铁，随机与 相邻 10 坐标内的个体发生交换。</div>
        <br/>
        <div>高铁管制开：禁止个体乘坐高铁</div>
        <img src={travleImg} alt=''/>
      </div>)
    }) 
  }
  { 
    flyModal({
      title: '高速管制',
      visible: modalVisible.way,
      setVisible: () => {
        setModalVisible({
          ...modalVisible,
          way: false
        })
      },
      content: (<div>
        <div>高速管制关：个体可自驾高速，随机与 相邻 5 坐标内的个体发生交换。</div>
        <br/>
        <div>高速管制开：禁止个体自驾高速</div>
        <img src={wayImg} alt=''/>
      </div>)
    }) 
  }
  { 
    flyModal({
      title: '普及带口罩',
      visible: modalVisible.mask,
      setVisible: () => {
        setModalVisible({
          ...modalVisible,
          mask: false
        })
      },
      content: (<div>
        <div>开启可减少个体间传染概率</div>
        <br/>
        <img src={maskImg} alt=''/>
      </div>)
    }) 
  }
  { 
    flyModal({
      title: '人员聚集管制',
      visible: modalVisible.gather,
      setVisible: () => {
        setModalVisible({
          ...modalVisible,
          gather: false
        })
      },
      content: (<div>
        <div>开启即禁止人员聚集类活动，减少传染概率</div>
        <br/>
        <img src={gatherImg} alt=''/>
      </div>)
    }) 
  }
  { 
    flyModal({
      title: '自我隔离占比',
      visible: modalVisible.home,
      setVisible: () => {
        setModalVisible({
          ...modalVisible,
          home: false
        })
      },
      content: (<div>
        <div>自我隔离占比，即个体与其他个体间自觉隔离，个体无被感染可能</div>
        <br/>
        <img src={homeImg} alt=''/>
      </div>)
    }) 
  }
    <List
        renderHeader={() => '演变属性'}
      >
    <List.Item
      extra={<Switch
        checked={!props.config.fly}
        onChange={(ev) => {
          props.setConfig({
            ...props.config,
            fly: !ev
          })
        }}
      />}
    >
      <div className='item_click' onClick={() => {
        setModalVisible({
          ...modalVisible,
          fly: true
        })
      }}>飞机管制<Icon type='right'></Icon></div>
    </List.Item>
    <List.Item
      extra={<Switch
        checked={!props.config.travel}
        onChange={(ev) => {
          props.setConfig({
            ...props.config,
            travel: !ev
          })
        }}
      />}
    >
      <div className='item_click' onClick={() => {
        setModalVisible({
          ...modalVisible,
          travel: true
        })
      }}>高铁管制<Icon type='right'></Icon></div>
    </List.Item>
    <List.Item
      extra={<Switch
        checked={!props.config.way}
        onChange={(ev) => {
          props.setConfig({
            ...props.config,
            way: !ev
          })
        }}
      />}
    >
      <div className='item_click' onClick={() => {
        setModalVisible({
          ...modalVisible,
          way: true
        })
      }}>高速管制<Icon type='right'></Icon></div>
    </List.Item>
    <List.Item
      extra={<Switch
        checked={props.config.mask}
        onChange={(ev) => {
          const percent = ev ? props.config.percent - 2 : props.config.percent + 2
          props.setConfig({
            ...props.config,
            mask: ev,
            percent
          })
        }}
      />}
    >
      <div className='item_click' onClick={() => {
        setModalVisible({
          ...modalVisible,
          mask: true
        })
      }}>个体普及戴口罩<Icon type='right'></Icon></div>
    </List.Item>
    <List.Item
      extra={<Switch
        checked={props.config.gather}
        onChange={(ev) => {
          const percent = ev ? props.config.percent - 2 : props.config.percent + 2
          props.setConfig({
            ...props.config,
            gather: ev,
            percent
          })
        }}
      />}
    >
      <div className='item_click' onClick={() => {
        setModalVisible({
          ...modalVisible,
          gather: true
        })
      }}>人员聚集管制<Icon type='right'></Icon></div>
    </List.Item>
    {/* <InputItem type="number"
            placeholder="输入 0 - 9 的数字"
            min={1}
            max={100}
            defaultValue={props.config.home}
            onChange={(ev) => {
              props.setConfig({
                ...props.config,
                home: ev
              })
            }}
            style={{
              textAlign: 'right'
            }}
          >
          <div className='item_click' onClick={() => {
        setModalVisible({
          ...modalVisible,
          home: true
        })
      }}>自我隔离占百分比<Icon type='right'></Icon></div>
      </InputItem> */}
      <List.Item
          wrap
          extra={
            <Stepper
              style={{ width: '100%', minWidth: '100px' }}
              showNumber
              max={10}
              min={1}
              value={props.config.speed}
              onChange={(ev) => {
                props.setConfig({
                  ...props.config,
                  speed: ev
                })
              }}
            />}
        >
        演化速度
        </List.Item>
    </List>
  </Modal>)
}