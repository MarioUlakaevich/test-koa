module.exports = {
    apps: [
      {
        name: "my-app",
        script: "./dist/index.js",
        instances: "max",
        exec_mode: "cluster",
      },
    ],
};  