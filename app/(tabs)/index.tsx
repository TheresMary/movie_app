import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { getMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import Typography from "@/components/Typography";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    getMovies({
      query: "",
    })
  );

  return (
    <View className="flex flex-1 bg-primary items-center !w-full">
      <Image
        source={images.bg}
        className="absolute !w-full"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-10 mb-5 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Typography tag="error">Error : {moviesError?.message}</Typography>
        ) : (
          <View>
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search through 300+ movies online"
            />
            <>
              <Typography tag="h1" className="mt-5 mb-3">
                Latest Movies
              </Typography>
              <FlatList
                data={movies}
                renderItem={({item})=>(
                  <MovieCard {...item}/>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 24,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              ></FlatList>
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
