import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import { ContextProvider } from "./notificationContext"

import App from "./App"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<ContextProvider>
			<App />
		</ContextProvider>
	</QueryClientProvider>
)
