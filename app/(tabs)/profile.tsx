import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const Profile = () => {
  return (
    <View className='bg-primary flex-1 justify-center items-center'>
      <Image source={icons.person} tintColor="#AB8BFF"></Image>
      <Text className='text-light-300 mt-2'>Profile</Text>
    </View>
  )
}

export default Profile