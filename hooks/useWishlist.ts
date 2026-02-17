import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const STORAGE_KEY = "wishlist";

function useWishlist() {
    const [wishlist, setWishlist] = useState<Movie[]>([]);

    useEffect(()=> {
        const loadWishlist = async () => {
            
            try{
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if(stored){
                    setWishlist(JSON.parse(stored));
                }
            }catch(e){
                console.log(e);
            }
        }
        loadWishlist();
    }, [])

    useEffect(()=> {

        const saveWishlist = async () => {
            try{

                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
            }
            catch(e){
                console.log(e);
            }
        }
        saveWishlist();
    }, [wishlist])
    

    const toggleWishlist = (movie : Movie) => {
        console.log("Wishlisted ", movie.title);
        
        setWishlist(prevWishlist => 
            prevWishlist.some((item) => item.id === movie.id) ? prevWishlist.filter((item) => item.id !== movie.id) : [...prevWishlist, movie]
        )
    }

    // console.log("wishlist length", wishlist.length);
    // console.log("wishlist", wishlist);
    // localStorage.setItem("wishlist", JSON.stringify(wishlist));
    return {wishlist, toggleWishlist}
    
}
export default useWishlist;
