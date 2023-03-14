import axios from "axios";
import { Announcement } from "../interfaces/appInterfaces";

// En este caso estoy usando un servidor local como proxy para
// hacer la petición a Api, ya que en local desde el cliennte
// da problemas de cors. 
const bitMexApi = axios.create({
    baseURL: 'http://localhost:4000',
})

// announcement
export const getAnnouncement = async() => {
    try {
        const { data } = await bitMexApi.get<{data: Announcement[]}>('/announcement');
        return data.data;
    } catch (error) {
        console.log(error);
        throw Error("Error al obtener las noticias")
    }
}