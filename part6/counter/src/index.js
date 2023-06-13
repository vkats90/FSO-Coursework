import ReactDOM from "react-dom/client"
import {
	CounterContextProvider,
	useCounterValue,
	useCounterDispatch,
} from "./CounterContext"

const Display = () => {
	const counter = useCounterValue()
	return <div>{counter}</div>
}

const Button = ({ type, label }) => {
	const dispatch = useCounterDispatch()
	return <button onClick={() => dispatch({ type })}>{label}</button>
}

const App = () => {
	return (
		<div>
			<Display />
			<div>
				<Button type="INCREMENT" label="+" />
				<Button type="DECREMENT" label="-" />
				<Button type="ZERO" label="0" />
			</div>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<CounterContextProvider>
		<App />
	</CounterContextProvider>
)
