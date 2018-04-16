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

import AnimatedLabel from '../../components/AnimatedLabel'

import Radio from '../../components/RadioBox'

export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // opc:1,
      // bg:colors.gray4,
      key: '',
      alt:false,
      altIndex:'',
      phoneList: [
        { txt: '15138678960' },
        { txt: '13186962939' },
      ],

      idList: [
        { txt: '身份证8733' },
        { txt: '身份证5728' },
      ],

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
      <View>
        <ScrollView style={{ paddingTop: 5, paddingBottom: 50, paddingHorizontal: 20 }}>
          {
            this.state.list.map((item, index) => (
              // item.key === 'startTime' ?
              <View style={styles.container} key={item.key}>
                {
                  'startTimephonecard'.includes(item.key ) ? 
                    <Text
                    onPress={
                      () => {
                        if(item.key==='phone'){
                          this.setState({
                            alt:true,
                            altIndex:index,
                            altList:this.state.phoneList
                          })
                        }else if(item.key==='card'){
                          this.setState({
                            alt:true,
                            altIndex:index,
                            altList:this.state.idList
                          })
                        }else{
                          this.SelectDate(item, index)
                        }
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
                    : null
                }

                <AnimatedLabel
                  ref={item.key}
                  style={styles.label}
                >
                  {item.label}
                </AnimatedLabel>
                {
                  'startTimephonecard'.includes(item.key ) 
                    ? <TextInput
                      style={styles.input}
                      placeholder={`请输入${item.label}`}
                      value={item.value || ''}
                      underlineColorAndroid='transparent'
                      keyboardType={item.keyboardType || 'default'}
                      caretHidden={true}
                      editable={true}
                    />
                    : <TextInput
                      onFocus={() => {
                        this.refs[item.key].focus()
                      }}
                      onBlur={() => {
                        if (item.value !== '') {
                          return;
                        }
                        this.refs[item.key].blur()
                      }}
                      style={styles.input}
                      placeholder={`请输入${item.label}`}
                      value={item.value || ''}
                      underlineColorAndroid='transparent'
                      clearButtonMode='always'
                      blurOnSubmit={true}
                      keyboardType={item.keyboardType || 'default'}
                      onChangeText={value => {
                        const newItem = Object.assign({}, item, { value })
                        let list = this.state.list;
                        list[index] = newItem;
                        this.setState({ list })
                      }}
                    />
                }

              </View>
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
                onPress={()=>{this.addMao(false)}}
              />
          }


        </ScrollView>

        {
          this.state.alt ?  <Radio list={this.state.altList || []} cb={this.cbSelect.bind(this)} /> : null
        }

      </View>
    )
  }
  componentDidMount() {
  }
  cbSelect(i){

    const newItem=Object.assign({},this.state.list[this.state.altIndex],{value:this.state.altList[i]['txt']});
    let list=this.state.list

    this.refs[newItem.key].focus()

    list[this.state.altIndex]=newItem;
    this.setState({list,alt:false})
  }
  async SelectDate(item, index) {

    this.refs[item.key].focus()

    try {
      const obj = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner',
      });
      if (obj.action !== DatePickerAndroid.dismissedAction) {
        const newItem = Object.assign({}, item, {
          value: `${obj.year}-${obj.month + 1}-${obj.day}`
        })
        let newList = this.state.list;
        newList[index] = newItem

        this.setState({ list: newList })

      } else {
        if (item.value === '') {
          this.refs[item.key].blur()
        }
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
  addMao = (isUpdate) => {
    let data = {isUpdate}
    for (let i = 0; i < this.state.list.length; i++) {
      if (this.state.list[i].value == '' || this.state.list[i].value == undefined) {
        ToastAndroid.show(`请输入${this.state.list[i]['label']}`, ToastAndroid.SHORT)
        return;
      }
      data[this.state.list[i]['key']] = this.state.list[i]['value']
      if(this.state.list[i]['key']==='card'){
        data[this.state.list[i]['key']] = this.state.list[i]['value'].slice(3)
      }
    }

    this.setState({ loading: true })

    const body = format(data)

    fetch(url.edit, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      body,
    }).then(res => res.json())
      .then(res => {
        this.setState({ loading: false })
        const status = Number(res.code);
        console.log(res.msg)
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
        } else if (status === 0) {
          // 失败
          ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        }else if(status===-1){
          Alert.alert(
            'sorry，',
            res.msg,
            [
              {text:'修改数据',onPress:()=>{this.addMao(true)}},
              {text:'取消',onPress:()=>{ToastAndroid.show('您已取消',ToastAndroid.SHORT)}},
            ],
            {cancelable:true}
          )
        }
      })
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#0f0',
    height: 50,
    position: 'relative',
    paddingTop: 16,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 20,
    fontSize: 13,
    color: colors.blueGreen,
  },
  btnBox: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  input: {
    // backgroundColor:'rgba(0,0,0,.3)',
    paddingLeft: 10,
    padding: 0,
    margin: 0,
    // paddingTop:10,
    borderBottomColor: colors.gray4,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    // height:50,
    flex: 1,
    fontSize: 14,
    // lineHeight:50,
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