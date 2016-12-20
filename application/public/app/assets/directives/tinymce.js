angular.module('ui.tinymce', [])
  .value('uiTinymceConfig', {})
  .directive('uiTinymce', ['uiTinymceConfig', function (uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
      priority: 10,
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        var expression, options, tinyInstance,
          updateView = function () {
            ngModel.$setViewValue(elm.val());
            if (!scope.$root.$$phase) {
              scope.$apply();
            }
          };

        // generate an ID if not present
        if (!attrs.id) {
          attrs.$set('id', 'uiTinymce' + generatedIds++);
        }

        if (attrs.uiTinymce) {
          expression = scope.$eval(attrs.uiTinymce);
        } else {
          expression = {};
        }

        // make config'ed setup method available
        if (expression.setup) {
          var configSetup = expression.setup;
          delete expression.setup;
        }

        options = {
          // Update model when calling setContent (such as from the source editor popup)
          setup: function (ed) {
            var args;
            ed.on('init', function(args) {
              ngModel.$render();
              ngModel.$setPristine();
            });
            // Update model on button click
            ed.on('ExecCommand', function (e) {
              ed.save();
              updateView();
            });
            // Update model on keypress
            ed.on('KeyUp', function (e) {
              ed.save();
              updateView();
            });
            // Update model on change, i.e. copy/pasted text, plugins altering content
            ed.on('SetContent', function (e) {
              if (!e.initial && ngModel.$viewValue !== e.content) {
                ed.save();
                updateView();
              }
            });
            ed.on('blur', function(e) {
                elm.blur();
            });
            // Update model when an object has been resized (table, image)
            ed.on('ObjectResized', function (e) {
              ed.save();
              updateView();
            });
            if (configSetup) {
              configSetup(ed);
            }
          },
                mode: 'exact',
                plugins: "link",
                entity_encoding : 'named',
                menubar: false,
                statusbar: false,
                toolbar: "bold italic underline alignleft aligncenter alignright styleselect fontsizeselect bullist numlist removeformat",
                elements: attrs.id
        };
        // extend options with initial uiTinymceConfig and options from directive attribute value
        angular.extend(options, uiTinymceConfig, expression);
        setTimeout(function () {
          tinymce.init(options);
        });

        ngModel.$render = function() {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }
          if (tinyInstance) {
            tinyInstance.setContent(ngModel.$viewValue || '');
          }
        };

        scope.$on('$destroy', function() {
          if (!tinyInstance) { tinyInstance = tinymce.get(attrs.id); }
          if (tinyInstance) {
            tinyInstance.remove();
            tinyInstance = null;
          }
        });
      }
    };
  }]);


/**
 * own module for tinymce
 * use by <div data-ui-tinymce class="identifier">
//  */

// angular.module('ui.tinymce', [])
//     .value('uiTinymceConfig', {})
//     .directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
//     uiTinymceConfig = uiTinymceConfig || {};
//     var generatedIds = 0;
//     return {
//         require: 'ngModel',
//         link: function(scope, elm, attrs, ngModel) {
//             var expression, options, tinyInstance;
//             // generate an ID if not present
//             if (!attrs.id) {
//                 attrs.$set('id', 'uiTinymce' + generatedIds++);
//             }
//             options = {
//                 // Update model when calling setContent (such as from the source editor popup)
//                 setup: function(ed) {
//                     ed.on('init', function(args) {
//                         ngModel.$render();
//                     });
//                     // Update model on button click
//                     ed.on('ExecCommand', function(e) {
//                         console.log("exec command");
                        
//                         ed.save();
//                         ngModel.$setViewValue(elm.val());
//                         if (!scope.$$phase) {
//                             scope.$apply();
//                         }
//                     });
//                     // Update model on keypress
//                     ed.on('KeyUp', function(e) {
//                         ed.save();
//                         ngModel.$setViewValue(elm.val());
//                         if (!scope.$$phase) {
//                             scope.$apply();
//                         }
//                     });
//                 },
//                 mode: 'exact',
//                 entity_encoding : 'named',
//                 menubar: false,
//                 statusbar: false,
//                 elements: attrs.id
//             };
//             if (attrs.uiTinymce) {
//                 expression = scope.$eval(attrs.uiTinymce);
//             } else {
//                 expression = {};
//             }
//             angular.extend(options, uiTinymceConfig, expression);
//             setTimeout(function() {
//                 tinymce.init(options);
//             });


//             ngModel.$render = function() {
//                 if (!tinyInstance) {
//                     tinyInstance = tinymce.get(attrs.id);
//                 }
//                 if (tinyInstance) {
//                     tinyInstance.setContent(ngModel.$viewValue || '');
//                 }
//             };
//         }
//     };
// }]); 