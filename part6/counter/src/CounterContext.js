import { createContext, useReducer, useContext } from "react"

const counterReducer = (state, action) => {
	switch (action.type) {
		case "INCREMENT":
			return state + 1
		case "DECREMENT":
			return state - 1
		case "ZERO":
			return 0
		default:
			return state
	}
}

const counterContext = createContext()

export const CounterContextProvider = (props) => {
	const [counter, counterDispatch] = useReducer(counterReducer, 0)

	return (
		<counterContext.Provider value={[counter, counterDispatch]}>
			{props.children}
		</counterContext.Provider>
	)
}

export const useCounterValue = () => {
	const counterAndDispatch = useContext(counterContext)
	return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
	const counterAndDispatch = useContext(counterContext)
	return counterAndDispatch[1]
}

export default counterContext
