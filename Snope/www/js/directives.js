angular.module('starter.directives', [])
  // directive to validate phone numbers. Add data-phone to the <input> element to trigger this.
  .directive('phone', function () {
    return {
      restrice: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

        var check = function (value) {
          return PHONE_REGEXP.test(value);
        };

        //For DOM -> model validation
        ctrl.$parsers.unshift(function (value) {
          var valid = check(value);
          ctrl.$setValidity(ctrl.$name, valid);

          return value;
        });
        //For model -> DOM validation
        ctrl.$formatters.unshift(function (value) {
          ctrl.$setValidity(ctrl.$name, check(value));
          return value;
        });
      }
    }
  });
