module.exports = function(config){
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app.js',
      'factories/**/*.js',
      'views/**/*.js',
      'controllers/**/*.js',
      'http://localhost:8080/socket.io/socket.io.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
    ]
  });
};
