const { defineConfig } = require('cypress');
const codeCoverage = require('@cypress/code-coverage/task');
const path = require('path');

const CategoryService = require(path.resolve('./services/category.service.js'));
const ChallengeService = require(path.resolve('./services/challenge.service.js'));
const MainService = require(path.resolve('./services/main.service.js'));
const UserService = require(path.resolve('./services/user.service.js'));
const { validateCodeWithGeminiAsync } = require(path.resolve('./services/gemini.service.js'));

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Registra o task do codeCoverage primeiro
      codeCoverage(on, config);

      // Agora registra SUAS tasks personalizadas
      on('task', {
        // ----- CategoryService -----
        'category:getAll': () => CategoryService.getCategoriesAsync(),
        'category:add': (data) => CategoryService.addCategoryAsync(data),
        'category:update': (data) => CategoryService.updateCategoryAsync(data),
        'category:delete': (id) => CategoryService.deleteCategoryAsync(id),

        // ----- ChallengeService -----
        'challenge:getAll': () => ChallengeService.getChallengesAsync(),
        'challenge:add': ({ challenge, user }) => ChallengeService.addChallengeAsync(challenge, user),
        'challenge:update': (challenge) => ChallengeService.updateChallengeAsync(challenge),
        'challenge:delete': (id) => ChallengeService.deleteChallengeAsync(id),
        'challenge:getDetails': (id) => ChallengeService.getChallengeDetailsAsync(id),
        'challenge:saveSubmit': ({ challengeId, userId, code, score }) =>
          ChallengeService.saveSubmissionAsync(challengeId, userId, code, score),

        // ----- MainService -----
        'main:login': ({ email, password }) => MainService.loginAsync(email, password),
        'main:signup': ({ name, email, password }) => MainService.signUpAsync(name, email, password),
        'main:getUserByEmail': (email) => MainService.getUserByEmailAsync(email),
        'main:saveResetToken': ({ userId, token, exp }) =>
          MainService.savePasswordResetTokenAsync(userId, token, exp),
        'main:getUserByToken': (token) => MainService.getUserByTokenAsync(token),
        'main:updatePassword': ({ userId, newPass }) => MainService.updatePasswordAsync(userId, newPass),
        'main:invalidateToken': (userId) => MainService.invalidateTokenAsync(userId),

        // ----- UserService -----
        'user:getAll': () => UserService.getUsersAsync(),
        'user:add': (user) => UserService.addUserAsync(user),
        'user:update': ({ userId, isAdmin }) => UserService.updateUserAsync(userId, isAdmin),
        'user:delete': (userId) => UserService.deleteUserAsync(userId),

        // ----- Gemini -----
        'gemini:validate': ({ challengeDetails, language, code }) =>
          validateCodeWithGeminiAsync(challengeDetails, language, code),
      });

      return config;
    },
  },
});
