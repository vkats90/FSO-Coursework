import { createContext, useReducer } from "react"

const notificationContext = createContext()

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION": {
			return action.payload
		}

		default:
			return ""
	}
}

export const ContextProvider = (props) => {
	const [message, messageDispatch] = useReducer(notificationReducer, "")

	return (
		<notificationContext.Provider value={[message, messageDispatch]}>
			{props.children}
		</notificationContext.Provider>
	)
}

export default notificationContext
