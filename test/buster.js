var config = module.exports;

config["Mediator tests"] = {
	environment: "node",
	rootPath: "../",
	sources: [
		"*.js"
	],
	tests: [
		"test/**/*-test.js"
	],
    'buster-istanbul': {
		outputDirectory: "coverage",
		format: "lcov",
		excludes: ["**/*.json"]
    },
    extensions: [
        require('buster-istanbul')
    ]
};
