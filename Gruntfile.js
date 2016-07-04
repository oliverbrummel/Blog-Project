module.exports = function(grunt) {
   // Project configuration.
   grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       watch: {
         scripts: {
           files: ['client/*.js'],
           tasks: ['uglify'],
           options: {
             spawn: false
           }
         }
       },
       uglify: {
           options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
           },
           build: {
               src: 'client/*.js',
               dest: 'server/public/assets/scripts/composite.all.min.js'
           }
       },
       copy: {
           main: {
               expand: true,
               cwd: "node_modules/",
               src: [
                   "bootstrap/dist/css/bootstrap.min.css",
                   "bootstrap/dist/css/bootstrap.min.css.map",
                   "bootstrap/dist/js/bootstrap.min.js",
                   "angular/angular.min.js",
                   "angular/angular.min.js.map",
                   "angular-route/angular-route.min.js",
                   "angular-route/angular-route.min.js.map",
                   "angular-moment/angular-moment.min.js",
                   "font-awesome/css/font-awesome.min.css",
                   "moment/min/moment.min.js"
               ],
               "dest": "server/public/vendors/"
           }
       }
   });

   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');

   // Default task(s).
   grunt.registerTask('default', ['copy', 'uglify']);

};
