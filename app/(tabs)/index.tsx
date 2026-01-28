import { getGenreDetails } from "@/api/genreApi";
import Movie from "@/components/movie";
import MovieGenre from "@/components/movieGenre";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [gerneData, setGerneData] = useState<any[]>([]);
  const [isGenreSelected, setIsGenreSelected] = useState<boolean>(false);
  const [genreId, setGenreId] = useState<number | null>(null);
  console.log("getGenreDetails", getGenreDetails());

  useEffect(() => {
    console.log("isGenreSelected changed to:", isGenreSelected);
  }, [isGenreSelected]);

  useEffect(() => {
    const fetchGerneData = async () => {
      const genreData = await getGenreDetails();
      console.log("genreData", genreData);
      setGerneData(genreData);
    };
    fetchGerneData();
  }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        data={[]} // no main list items
        renderItem={() => null}
        keyExtractor={() => "key"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <View className="px-5">
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />

            <SearchBar
              onPress={() => router.push("./search")}
              placeholder="Search for a movie"
            />

            <FlatList
              data={gerneData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              className="mt-5 mb-2"
              ListHeaderComponent={
                <TouchableOpacity
                  onPress={() => {
                    setIsGenreSelected(false);
                    setGenreId(null);
                  }}
                  className={`px-4 py-2 rounded-full mr-3 ${
                    !isGenreSelected ? "bg-white" : "bg-dark-200"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      !isGenreSelected ? "text-black" : "text-white"
                    }`}
                  >
                    All
                  </Text>
                </TouchableOpacity>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setIsGenreSelected(true);
                    setGenreId(item.id);
                  }}
                  className={`px-4 py-2 rounded-full mr-3 ${
                    isGenreSelected && genreId === item.id
                      ? "bg-white"
                      : "bg-dark-200"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      isGenreSelected && genreId === item.id
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {!isGenreSelected && (
              <>
                <Text className="text-white text-2xl font-bold mt-5 mb-3">
                  Top 20 TV Shows
                </Text>
                <Movie />
              </>
            )}

            <MovieGenre isGenreSelected={isGenreSelected} genreId={genreId} />
          </View>
        }
      />
    </View>
  );
}
