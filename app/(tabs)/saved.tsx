import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Saved = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadWishlist = async () => {
      try{
        const stored = await AsyncStorage.getItem("wishlist");
        if(stored){
          setWishlist(JSON.parse(stored));
        }
      }
      catch(e){
        console.log(e);
      }
    }
    loadWishlist();
  }, [])
  
  const handleMoviePress = (movie: any) => {
    router.push(`/movies/${movie.id}`);
  };
  return (
    <SafeAreaView className="flex-1 bg-dark-100">
      <View className="px-5 pt-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between">
            {wishlist.map((item : any) => (
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
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Saved;
