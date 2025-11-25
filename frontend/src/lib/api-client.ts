import axios from 'axios'
import { API_CONFIG } from './constants'

// базовый клиент для всех апи запросов
export const apiClient = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	headers: {
		'Content-Type': API_CONFIG.CONTENT_TYPE,
	},
})

// перехватываем ошибки и возвращаем только data из response
// это упрощает обработку ошибок в компонентах
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			return Promise.reject(error.response.data)
		}
		return Promise.reject(error)
	}
)

