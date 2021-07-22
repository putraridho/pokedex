module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["raw.githubusercontent.com"],
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/pokemon",
				permanent: false,
			},
		];
	},
};
