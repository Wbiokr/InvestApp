import React from 'react';

import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  ToastAndroid,
  Alert,
  TimePickerAndroid,
  DatePickerAndroid,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Fumi
} from 'react-native-textinput-effects';

import {
  Icon
} from 'react-native-vector-icons';

import {
  Button
} from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/color';

import url from '../../utils/api'

import format from '../../utils/format'

export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // opc:1,
      // bg:colors.gray4,
      key: '',
      list: [
        {
          label: '平台名称',
          iconName: 'bus',
          key: 'name',
          value: '',
        },
        {
          label: '本金数额',
          iconName: 'rmb',
          value: '',
          key: 'cash',
          keyboardType: 'numeric',
        },
        {
          label: '总撸金额',
          // label:'总撸数额',
          iconName: 'rupee',
          value: '',
          keyboardType: 'numeric',
          key: 'rateAll',
        },
        {
          label: '已返红包',
          iconName: 'inr',
          value: '',
          keyboardType: 'numeric',
          key: 'rateHas'
        },
        {
          label: '代收利息',
          // label:'总撸数额',
          iconName: 'rupee',
          value: '',
          keyboardType: 'numeric',
          key: 'rateIng',
        },
        {
          label: '开始时间',
          value: '',
          iconName: 'hourglass-start',
          key: 'startTime',
        },
        {
          label: '标的周期',
          iconName: 'hourglass-end',
          value: '',
          keyboardType: 'numeric',
          key: 'endTime',
        },
        {
          label: '手机尾号',
          iconName: 'phone',
          value: '',
          keyboardType: 'phone-pad',
          key: 'phone',
        },
        {
          label: '身份证号',
          iconName: 'drivers-license-o',
          value: '',
          key: 'card',
          keyboardType: 'email-address',
        }
      ]
    }
  }
  render() {
    return (
      <ScrollView style={{ paddingTop: 5, paddingBottom: 50, paddingHorizontal: 20 }}>
        {
          this.state.list.map((item, index) => (
            item.key === 'startTime' ? <TouchableOpacity
              // background={TouchableNativeFeedback.Ripple(colors.blue,true)}
              key={index}
              activeOpacity={0.9}
            // onPress={function(e){console.log(e)}}
            >
              <View>
                <Text
                  onPress={
                    () => {
                      this.SelectDate(item,index)
                    }
                  }
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    // backgroundColor:'#f00',
                    zIndex: 100,

                  }}></Text>
                <TextInput
                  style={styles.input}
                  placeholder={`请输入${item.label}`}
                  value={item.value || ''}
                  underlineColorAndroid='transparent'
                  keyboardType={item.keyboardType || 'default'}
                  onChangeText={value => {
                    const newItem = Object.assign({}, item, { value })
                    let list = this.state.list;
                    list[index] = newItem;
                    this.setState({ list })
                  }}
                />
              </View>
            </TouchableOpacity> : <TouchableOpacity
              // background={TouchableNativeFeedback.Ripple(colors.blue,true)}
              key={index}
            // activeOpacity={0.5}
            // onPress={function(e){console.log(e)}}
            >
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder={`请输入${item.label}`}
                    value={item.value || ''}
                    underlineColorAndroid='transparent'
                    keyboardType={item.keyboardType || 'default'}
                    onChangeText={value => {
                      const newItem = Object.assign({}, item, { value })
                      let list = this.state.list;
                      list[index] = newItem;
                      this.setState({ list })
                    }}
                  />
                </View>
              </TouchableOpacity>
          ))
        }

        {
          this.state.loading ? <Button
            ref='btn2'
            title='提交中...'
            raised
            loading
            backgroundColor={colors.blue}
          /> :
            <Button
              // ref='btn'
              title='提交'
              raised
              backgroundColor={colors.blue}
              containerViewStyle={{ marginVertical: 10, marginBottom: 40 }}
              icon={{ name: 'check' }}
              onPress={this.addMao}
            />
        }

      </ScrollView>
    )
  }
  componentDidMount() {
  }
  async SelectDate(item,index) {
    try {
      const obj = await DatePickerAndroid.open({
        date: new Date(this.formatDate()),
        mode: 'spinner',
      });
      if (obj.action !== DatePickerAndroid.dismissedAction) {
        const newItem=Object.assign({},item,{
          value:`${obj.year}-${obj.month}-${obj.day}`
        }) 
        let newList=this.state.list;
        newList[index]=newItem

        this.setState({list:newList})

      }
    } catch ({ code, message }) {
      alert(message)
    }
  }
  formatDate() {
    const date = new Date();

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${month}-0${day}`
  }
  addMao = () => {
    alert(11)
    this.SelectDate()
    return;
    let data = {}
    for (let i = 0; i < this.state.list.length; i++) {
      if (this.state.list[i].value == '' || this.state.list[i].value == undefined) {
        ToastAndroid.show(`请输入${this.state.list[i]['label']}`, ToastAndroid.SHORT)
        return;
      }
      data[this.state.list[i]['key']] = this.state.list[i]['value']
    }

    this.setState({ loading: true })

    const body = format(data)


    fetch(url.insert, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      body,
    }).then(res => res.json())
      .then(res => {
        this.setState({ loading: false })
        const status = Number(res.code);
        ToastAndroid.show(res.msg, ToastAndroid.SHORT)
        if (status === 1) {
          // 添加成功
          Alert.alert(
            '添加提示：',
            res.msg,
            [
              { text: '去首页', onPress: () => { this.props.navigation.navigate('Home', { type: 'update' }) } },
              { text: '先留下', onPress: () => { ToastAndroid.show('您已经取消', ToastAndroid.SHORT) } },
            ],
            { cancelable: false }
          )
        } else if (status === -1) {
          // 失败

        }
      })
  }
}

const styles = StyleSheet.create({
  btnBox: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  input: {
    paddingLeft: 10,
    borderBottomColor: colors.gray4,
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  btn: {
    // flex:1,
    width: '100%',
    backgroundColor: colors.gray4,
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 40,
    fontSize: 16,
    letterSpacing: 60,
    borderRadius: 6,

  },
})