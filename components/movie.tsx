import { getMovieDetails } from "@/api/moviesApi";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Movie = () => {
  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const data = await getMovieDetails();
        console.log("Movies data:", data);
        if (Array.isArray(data)) {
          setMoviesData(data.slice(0, 20)); // Show top 20
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesData();
  }, []);
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" className="mt-10" />
      ) : moviesData.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
          className="mb-6"
        >
          {moviesData.map((result: any, index: number) => (
            <View
              key={index}
              className="rounded-xxl  border border-dark-300 w-40"
            >
              <Link
               href={`/movies/${result.id}`} asChild>
              <TouchableOpacity className="flex flex-1 flex-col items-start">
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${result.poster_path}` }}
                  className="w-full h-60 rounded-t-lg bg-dark-300"
                  resizeMode="contain"
                />
                
              </TouchableOpacity>
              </Link>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text className="text-red-400 mt-5">Failed to load movies data</Text>
      )}
    </View>
  );
};

export default Movie;
