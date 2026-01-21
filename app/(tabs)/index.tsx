import { getMovieDetails } from "@/api/moviesApi";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const data = await getMovieDetails();
        console.log("data", data);
        // RapidAPI returns an array or object with movies
        if (Array.isArray(data)) {
          setMoviesData(data.slice(0, 10)); // Show top 10 for now
        } else if (data && data.results) {
          setMoviesData(data.results.slice(0, 10));
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMoviesData();
  }, [])
  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, minHeight: '100%' }}>
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
          resizeMode="contain"
        />
        <View>
          <SearchBar
          onPress={() => router.push("./search")}
          placeholder = "Search for a movie"
          />
        </View>
        
        <Text className="text-white text-2xl font-bold mt-5 mb-3">Top 250 Movies</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" className="mt-10" />
        ) : moviesData.length > 0 ? (
          <View className="gap-4">
            {moviesData.map((movie: any, index: number) => (
              <View key={index} className="bg-dark-200 rounded-xl p-5 border border-dark-300">
                <View className="flex-row items-start">
                  <Text className="text-yellow-400 text-lg font-bold mr-3">#{index + 1}</Text>
                  <View className="flex-1">
                    <Text className="text-white text-lg font-bold mb-1">{movie.title || movie.Title}</Text>
                    <Text className="text-gray-400 text-sm mb-2">{movie.year || movie.Year}</Text>
                    
                    {movie.rating && (
                      <Text className="text-yellow-400 text-sm">⭐ {movie.rating} / 10</Text>
                    )}
                    
                    {movie.description && (
                      <Text className="text-gray-300 text-sm mt-2" numberOfLines={3}>{movie.description}</Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-red-400 mt-5">Failed to load movies data</Text>
        )}
      </ScrollView>
    </View>
  );
}
