import { View, TextInput, Image, Pressable } from 'react-native';
import { icons } from '@/constants/icons';

interface SearchBarProps{
    onPress?: ()=>void;
    placeholder: string;
}

const SearchBar = ({onPress, placeholder}: SearchBarProps) => {
  return (
    <Pressable onPress={onPress} className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} tintColor="#AB8BFF" className="!size-4" />
      <TextInput 
        placeholder={placeholder}
        className='flex-1 ml-2 text-white'
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#A8B5DB"/>
    </Pressable>
  )
}

export default SearchBar;