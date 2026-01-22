import Movie from "@/components/movie";
import MovieGenre from "@/components/movieGenre";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  
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

        <View className="mt-5 mb-2 flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.push("./nowPlaying")}
            className="bg-dark-200 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("./topRated")}
            className="bg-dark-200 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">Action</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("./upcoming")}
            className="bg-dark-200 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">Thriller</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("./upcoming")}
            className="bg-dark-200 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">Horror</Text>
          </TouchableOpacity>
        </View>
        
        <Text className="text-white text-2xl font-bold mt-5 mb-3">Top 20 TV Shows</Text>
        <Movie/>
        <MovieGenre />
      </ScrollView>
    </View>
  );
}
