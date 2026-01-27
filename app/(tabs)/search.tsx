import { getMovieDetails } from "@/api/moviesApi";
import SearchBar from "@/components/searchBar";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Debounce the search query by 500ms
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const searchMovies = async () => {
      if (!debouncedSearchQuery.trim()) {
        setMovies([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await getMovieDetails({ query: debouncedSearchQuery });
        setMovies(Array.isArray(results) ? results : []);
      } catch (err) {
        setError("Failed to fetch movies");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [debouncedSearchQuery]);

  const handleMoviePress = (movie: any) => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-100">
      <View className="px-5 pt-5">
        <Text className="text-white text-3xl font-bold mb-5">
          Search Movies
        </Text>
        <SearchBar
          placeholder="Search for movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={true}
        />
      </View>

      <View className="flex-1 px-5 mt-5">
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" className="mt-10" />
        ) : error ? (
          <Text className="text-red-500 text-center mt-10">{error}</Text>
        ) : searchQuery && movies.length === 0 && !loading ? (
          <Text className="text-gray-400 text-center mt-10">
            No movies found for {searchQuery}
          </Text>
        ) : !searchQuery ? (
          <Text className="text-gray-400 text-center mt-10">
            Start typing to search for movies
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between">
              {movies.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleMoviePress(item)}
                  className="w-[48%] mb-4"
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                    className="w-full h-64 rounded-lg"
                    resizeMode="cover"
                  />
                  <Text
                    className="text-white text-sm font-semibold mt-2"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-yellow-400 text-xs">⭐</Text>
                    <Text className="text-gray-300 text-xs ml-1">
                      {item.vote_average?.toFixed(1) || "N/A"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
