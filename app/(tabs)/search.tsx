import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { getMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import Typography from "@/components/Typography";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => getMovies({ query: searchQuery }), false);

  const handleSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary w-full items-center">
      <Image
        source={images.bg}
        className="!w-full absolute"
        resizeMode="cover"
      ></Image>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          columnGap: 20,
          marginBottom: 24,
        }}
        className="w-full px-5"
        ListHeaderComponent={
          <>
            <View className="w-full justify-center mt-10 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search through 300+ movies online"
                value={searchQuery}
                onChangeText={handleSearch}
              />

              {moviesLoading && (
                <ActivityIndicator
                  size="large"
                  color="#9CA4AB"
                  className="my-3"
                />
              )}

              {}
              {moviesError && (
                <Typography tag="error">
                  Error : {moviesError?.message}
                </Typography>
              )}

              {!moviesLoading &&
                !moviesError &&
                searchQuery.trim() &&
                movies?.length! > 0 && (
                  <Text className="text-sm mt-4 text-white font-bold">
                    Search Results for{" "}
                    <Text className="text-accent">{searchQuery.trim()}</Text>
                  </Text>
                )}
            </View>
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View>
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "Oops..No movies found!"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
