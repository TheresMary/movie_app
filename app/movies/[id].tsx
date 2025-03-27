import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import { getMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import MovieInfo from "@/components/MovieInfo";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movieDetails, loading: moviesLoading } = useFetch(() =>
    getMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
            }}
            className="w-full h-[470px]"
            resizeMode="cover"
          />

          <TouchableOpacity
            className="absolute -bottom-4 right-5 rounded-full size-8 bg-white flex items-center justify-center"
            onPress={() => router.back()}
          >
            <Image
              source={icons.call}
              className="!size-5"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">
            {movieDetails?.title}
          </Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movieDetails?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">
              {movieDetails?.runtime}m
            </Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {movieDetails?.vote_average?.toFixed(0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movieDetails?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo
            title="Overview"
            content={movieDetails?.overview || "No content"}
          />
          <MovieInfo
            title="Genres"
            content={
              movieDetails?.genres?.map((item) => item.name).join(" • ") ||
              "N/A"
            }
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              title="Budget"
              content={`$${(movieDetails?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              title="Revenue"
              content={`$${Math.round(
                (movieDetails?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            title="Production Companies"
            content={
              movieDetails?.production_companies
                ?.map((c) => c.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-2.5 flex flex-row items-center justify-center z-50"
        onPress={() => router.back()}
      >
        <Text className="text-primary text-sm font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
