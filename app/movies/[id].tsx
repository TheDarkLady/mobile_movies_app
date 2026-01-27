import { getMovieById } from '@/api/moviesApi';
import { icons } from '@/constants/icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MovieDetail {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getMovieById(id as string);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Movie details error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-dark-100 items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  if (error || !movie) {
    return (
      <SafeAreaView className="flex-1 bg-dark-100 items-center justify-center px-5">
        <Text className="text-red-500 text-lg text-center">{error || 'Movie not found'}</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-5 bg-blue-500 px-6 py-3 rounded-lg">
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Backdrop Image */}
        <View className="relative">
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` }}
            className="w-full h-64"
            resizeMode="cover"
          />
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-5 left-5 bg-black/50 p-3 rounded-full"
          >
            <Image
              source={icons.arrow}
              className="w-6 h-6"
              resizeMode="contain"
              tintColor="#ffffff"
            />
          </TouchableOpacity>
          {/* Gradient Overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-100" />
        </View>

        {/* Content */}
        <View className="px-5 -mt-16">
          {/* Poster and Basic Info */}
          <View className="flex-row">
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}` }}
              className="w-32 h-48 rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4 justify-end pb-2">
              <Text className="text-white text-2xl font-bold">{movie.title}</Text>
              {movie.tagline ? (
                <Text className="text-gray-400 text-sm italic mt-1">{movie.tagline}</Text>
              ) : null}
              <View className="flex-row items-center mt-3">
                <Text className="text-yellow-400 text-lg">⭐</Text>
                <Text className="text-white text-lg font-semibold ml-1">
                  {movie.vote_average.toFixed(1)}
                </Text>
                <Text className="text-gray-400 text-sm ml-1">/10</Text>
              </View>
            </View>
          </View>

          {/* Genres */}
          <View className="flex-row flex-wrap mt-5">
            {movie.genres?.map((genre) => (
              <View key={genre.id} className="bg-dark-200 px-4 py-2 rounded-full mr-2 mb-2">
                <Text className="text-gray-300 text-sm">{genre.name}</Text>
              </View>
            ))}
          </View>

          {/* Release Date and Runtime */}
          <View className="flex-row mt-4">
            <View className="flex-row items-center mr-6">
              <Text className="text-gray-400 text-sm">📅 </Text>
              <Text className="text-white text-sm">
                {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'N/A'}
              </Text>
            </View>
            {movie.runtime ? (
              <View className="flex-row items-center">
                <Text className="text-gray-400 text-sm">⏱️ </Text>
                <Text className="text-white text-sm">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </Text>
              </View>
            ) : null}
          </View>

          {/* Overview */}
          <View className="mt-6 mb-8">
            <Text className="text-white text-xl font-bold mb-3">Overview</Text>
            <Text className="text-gray-300 text-base leading-6">
              {movie.overview || 'No overview available.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetails;
