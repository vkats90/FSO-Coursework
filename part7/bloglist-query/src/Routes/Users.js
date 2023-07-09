import User from '../components/User'
import { useQuery } from 'react-query'
import userService from '../services/users'

const Users = () => {
	const users = useQuery(
		'users',
		() => userService.getUsers().then((users) => users),
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	console.log(users)

	return (
		<div
			className=" square xyz-in w-max bg-gradient-to-b from-white to-purple-50 border-2 border-purple-200 m-8 p-5 rounded-lg pb-10"
			xyz="fade right-3"
		>
			<h2 className="text-3xl py-5 font-bold text-purple-800">Users</h2>
			{users.isLoading ? (
				<div>
					<div className="blog_title border animate-pulse opacity-75 border-gray-200 rounded-md p-2 w-96 m-2 bg-white h-11" />
					<div className="blog_title border animate-pulse opacity-75 border-gray-200 rounded-md p-2 w-96 m-2 bg-white h-11" />
				</div>
			) : users.isError ? (
				<p>{users.error.message}</p>
			) : (
				<table>
					<thead>
						<tr className="text-purple-600 text-left">
							<th width="200">Username</th>
							<th width="200">blogs</th>
						</tr>
					</thead>

					{users.data.data.map((user) => (
						<User user={user} key={user.id} />
					))}
				</table>
			)}
		</div>
	)
}

export default Users
