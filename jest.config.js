module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["jest-dom/extend-expect"],
  testPathIgnorePatterns: ["/node_modules/", "/storybook-static/"]
};
