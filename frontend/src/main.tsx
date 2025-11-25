import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { router } from './routes'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App>
			<RouterProvider router={router} />
		</App>
	</StrictMode>
)
