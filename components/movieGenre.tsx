import { getGenreDetails } from "@/api/genreApi";
import { getMovieDetails } from "@/api/moviesApi";
import { icons } from "@/constants/icons";
import useWishlist from "@/hooks/useWishlist";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieGenre = ({
  isGenreSelected,
  genreId,
}: {
  isGenreSelected: boolean;
  genreId: number | null;
}) => {
  const [genreData, setGenreData] = useState<any[]>([]);
  const [movieData, setMovieData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { wishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genres, movies] = await Promise.all([
          getGenreDetails(),
          getMovieDetails(),
        ]);

        if (Array.isArray(genres)) setGenreData(genres);
        if (Array.isArray(movies)) setMovieData(movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getMoviesByGenre = (genreId: number) =>
    movieData.filter(movie => movie.genre_ids?.includes(genreId));

  const renderMovieCard = ({ item }: { item: any }) => {
    const isWishlisted = wishlist.some(movie => movie.id === item.id);

    return (
      <TouchableOpacity
        className="mr-4 pb-4"
        onPress={() => router.push(`/movies/${item.id}`)}
        activeOpacity={0.8}
      >
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(item);
          }}
          className="absolute top-2 right-2 z-10"
        >
          <Image
            source={icons.save}
            className="w-[18px] h-[18px]"
            style={{ tintColor: isWishlisted ? "#0F0D23" : "#fff" }}
          />
        </Pressable>

        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          className="w-36 h-48 rounded-lg"
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" className="mt-10" />;
  }

  // 🔹 GENRE SELECTED VIEW
  if (isGenreSelected) {
    return (
      <View className="mt-5 p-5">
        <FlatList
          data={getMoviesByGenre(genreId!)}
          numColumns={2}
          columnWrapperStyle={{ gap: 2, justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMovieCard}
        />
      </View>
    );
  }

  // 🔹 ALL GENRES VIEW
  return (
    <View className="flex flex-col">
      {genreData.map((genre: any) => {
        const genreMovies = getMoviesByGenre(genre.id);
        if (genreMovies.length === 0) return null;

        return (
          <View key={genre.id} className="mb-6">
            <Text className="text-white text-2xl font-bold mb-3">
              {genre.name}
            </Text>

            <FlatList
              data={genreMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const isWishlisted = wishlist.some(
                  movie => movie.id === item.id
                );

                return (
                  <TouchableOpacity
                    className="mr-4"
                    onPress={() => router.push(`/movies/${item.id}`)}
                  >
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      className="absolute top-2 right-2 z-10"
                    >
                      <Image
                        source={icons.save}
                        className="w-[18px] h-[18px]"
                        style={{
                          tintColor: isWishlisted ? "#0F0D23" : "#fff",
                        }}
                      />
                    </Pressable>

                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                      className="w-32 h-48 rounded-lg"
                      resizeMode="cover"
                    />

                    <Text
                      className="text-white text-sm mt-2 w-32"
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>

                    <View className="flex flex-row items-center mt-1">
                      <Text className="text-yellow-400 text-xs">⭐</Text>
                      <Text className="text-gray-300 text-xs ml-1">
                        {item.vote_average?.toFixed(1)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default MovieGenre;
