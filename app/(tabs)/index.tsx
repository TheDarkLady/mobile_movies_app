import { getGenreDetails } from "@/api/genreApi";
import Movie from "@/components/movie";
import MovieGenre from "@/components/movieGenre";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [gerneData, setGerneData] = useState<any[]>([]);
  console.log("getGenreDetails",getGenreDetails());
  useEffect(() => {
    const fetchGerneData = async () => {
      const genreData = await getGenreDetails();
      console.log("genreData",genreData);
      setGerneData(genreData);
    }
    fetchGerneData();
  },[])
  
  
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

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mt-5 mb-2"
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
          >
          {gerneData.map((genre: any) => (
            <TouchableOpacity
              key={genre.id}
              onPress={() => router.push("./nowPlaying")}
              className="bg-dark-200 px-4 py-2 rounded-full mr-3"
            >
              <Text className="text-white font-semibold">{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text className="text-white text-2xl font-bold mt-5 mb-3">Top 20 TV Shows</Text>
        <Movie/>
        <MovieGenre />
      </ScrollView>
    </View>
  );
}
