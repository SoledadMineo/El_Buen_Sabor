import axios from 'axios';
import type ArticuloManufacturado from '../entidades/ArticuloManufacturado';


const API_URL = 'http://localhost:3000/api/articulos-manufacturados';

export const getArticulos = () => axios.get<ArticuloManufacturado[]>(API_URL);
export const createArticulo = (articulo: ArticuloManufacturado) => axios.post(API_URL, articulo);
export const updateArticulo = (id: number, articulo: ArticuloManufacturado) => axios.put(`${API_URL}/${id}`, articulo);
export const deleteArticulo = (id: number) => axios.delete(`${API_URL}/${id}`);

// export async function getArticuloManufacturadoJSONFetch(){
// 	const urlServer = 'http://localhost:3000/api/articulos-manufacturados';
// 	const response = await fetch(urlServer, {
// 		method: 'GET',
//         headers: {
// 			'Content-type': 'application/json',
// 			'Access-Control-Allow-Origin':'*'
// 		},
//         mode: 'cors'
// 	});
// 	console.log(response);
// 	return await response.json();
// }

export async function getArticuloManufacturadoXIdFecth(id:number){
	const urlServer = `http://localhost:3000/api/articulos-manufacturados/${id}`;
    console.log(urlServer);
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
 	});

	return await response.json() as ArticuloManufacturado;
}
