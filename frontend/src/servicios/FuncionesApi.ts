import axios from 'axios';
import type ArticuloManufacturado from '../entidades/ArticuloManufacturado';
import type ArticuloInsumo from '../entidades/ArticuloInsumo';


const API_URL = 'http://localhost:3000/api';

export const getArticulosManufacturados = () => axios.get<ArticuloManufacturado[]>(`${API_URL}/articulos-manufacturados`);
export const createArticuloManufacturado = (articulo: ArticuloManufacturado) => axios.post(`${API_URL}/articulos-manufacturados`, articulo);
export const updateArticuloManufacturado = (id: number, articulo: ArticuloManufacturado) => axios.put(`${API_URL}/articulos-manufacturados/${id}`, articulo);
export const deleteArticuloManufacturado = (id: number) => axios.delete(`${API_URL}/articulos-manufacturados/${id}`);

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

export async function getArticuloManufacturadoXIdFecth(id: number) {
	const urlServer = `${API_URL}/articulos-manufacturados/${id}`;
	console.log(urlServer);
	const response = await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});

	return await response.json() as ArticuloManufacturado;
}

export async function getArticuloInsumos(esParaElaborar: boolean) {
	console.log("es para elaborar", esParaElaborar);
	const urlServer = `${API_URL}/insumos`;
	const filterParaElaborar = esParaElaborar != null
		? `?esParaElaborar=${esParaElaborar}`
		: "";
	console.log(filterParaElaborar)
	console.log(urlServer);
	const response = await fetch(`${urlServer}${filterParaElaborar}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});

	return await response.json() as ArticuloInsumo[];
}

export async function getArticuloInsumosXId(id: number) {
	const urlServer = `${API_URL}/insumos/${id}`;
	console.log(urlServer);
	const response = await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});

	return await response.json() as ArticuloInsumo;
}