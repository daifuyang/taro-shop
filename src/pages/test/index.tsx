import { View, Text } from '@tarojs/components'
import Taro,{ useLoad,useDidShow } from '@tarojs/taro'


export default function Index() {
  useDidShow(() => {
  })
  return (
    <View className='index'>
      <Text>Hello shop-react!</Text>
    </View>
  )
}
