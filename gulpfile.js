'use strict';

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    rename = require("gulp-rename"),
    insert = require('gulp-insert');


var document = `var JSDOM = require('jsdom').JSDOM;
      var window = (new JSDOM()).window;
      var document = window.document;`
/*
gulp.task('blockly', function() {
  return gulp.src('blockly/blockly_compressed.js')
      .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=global;'))
      .pipe(insert.wrap(`
      ${document}
      var DOMParser = window.DOMParser;
      var xmlshim = require('xmlshim');
      var XMLSerializer = xmlshim.XMLSerializer;
      var DOMParser = xmlshim.DOMParser; 
      module.exports = (function(){ // `,
          //....ORIGINAL CODE....
          `Blockly.goog=goog;return Blockly;
      })()`))
      .pipe(gulp.dest('lib'))
});
*/
gulp.task('blockly', function() {
  return gulp.src('blockly/blockly_compressed.js')
      .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=window;'))
      .pipe(insert.wrap(`
      module.exports = (function(){ //`,
          //....ORIGINAL CODE....
          `Blockly.goog=goog;return Blockly;
      })()`))
      //.pipe(rename(_browserRename))
      .pipe(gulp.dest('dist'))
});

gulp.task('blocks', function() {
  return gulp.src('blockly/blocks_compressed.js')
      .pipe(insert.wrap(`
        module.exports = function(Blockly){
          var goog = Blockly.goog;
          Blockly.Blocks={};`,
          //....ORIGINAL CODE....
          `return Blockly.Blocks;
        }`))
      .pipe(gulp.dest('dist'))
});

gulp.task('js', function() {
  return gulp.src('blockly/javascript_compressed.js')
      .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.JavaScript;}'))
      .pipe(gulp.dest('dist'))
});


gulp.task('th', function(){
  return gulp.src('blockly/msg/th.js')
      .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={};  module.exports = function(){','\n return Blockly.Msg;}'))
      .pipe(gulp.dest('dist/msg'))
});

gulp.task('en', function(){
  return gulp.src('blockly/msg/en.js')
      .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={};  module.exports = function(){','\n return Blockly.Msg;}'))
      .pipe(gulp.dest('dist/msg'))
});

gulp.task('build', [  
  'blocks',  
  'blockly',
  'js',
  'th',
  'en'
]);




