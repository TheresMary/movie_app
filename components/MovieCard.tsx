import { View, Text, Image, TouchableOpacity } from "react-native";
Image;
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import Typography from "./Typography";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: MovieItemProps) => {
  return (
    <Link href={`/movies/${id}`} asChild className="w-[30%]">
      <TouchableOpacity>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-48 rounded-lg mb-3"
          resizeMode="cover"
        ></Image>
        <Text
          numberOfLines={1}
          className="text-sm text-white font-bold mb-2"
        >
          {title}
        </Text>
        <View className="flex-row gap-x-1 items-center mb-2">
          <Image source={icons.star} className="!size-2"></Image>
          <Typography tag="small" className="text-white font-bold">{(vote_average/2).toFixed(1)}</Typography>
        </View>
        <Typography tag="small" className="text-light-300">{(release_date)?.split("-")[0]}</Typography>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
