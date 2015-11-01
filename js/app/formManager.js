/*******************************************************************************
 * Angular form registration module
 * @author Sam Almen <sam.almen@gmail.com>
 * @license This code's main porpose only for test not for commercial use, make 
 * agreement with the author if you intend to use it in a commercial porpose
 ******************************************************************************/
if (angular) {
    var EMAIL_REGEXP = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        SWEDISH_IBAN = /(se+\d{22})$/i,
        formApp = angular.module('FormModule', ['ngResource']);
    formApp.controller('FormController', ['$scope', 'translationEngine', function ($scope, translationEngine) {

            $scope.translate = function () {
                translationEngine.getTranslation($scope, $scope.selectedLanguage);
            };

            //Init swedish translation
            $scope.selectedLanguage = 'sv-se';
            $scope.translate();

            $scope.submituser = function () {
                if ($scope.form) {
                    $scope.submitname = $scope.form.Uname.$modelValue;
                    $scope.submitemail = $scope.form.Uemail.$modelValue;
                    $scope.submitiban = $scope.form.Uibanaccount.$modelValue;
                    $scope.reset();
                }
            };

            $scope.reset = function () {
                if ($scope.form) {
                    $scope.user = angular.copy({});
                    $scope.form.$setValidity();
                    $scope.form.$setUntouched();
                    $scope.form.$setPristine();
                }
            };
        }]);

    // Translation service from a locale i18n JSON file
    formApp.service('translationEngine', function ($resource) {
        this.getTranslation = function ($scope, language) {
            var languageFilePath = 'i18n/i18n_locale_' + language + '.json';
            $resource(languageFilePath).get(function (data) {
                $scope.translation = data;
            });
        };
    });

    // Form template
    formApp.directive('registrationForm', function () {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: false,
            template:
                    '<form novalidate id="angular-form" class="angular-form" name="form" ng-model="form" autocomplete="off" ng-submit="submituser()">' +
                    '<label><bold>{{translation.NAME}}:</bold>&nbsp;<input id="user-name" type="text" ng-model="user.name" name="Uname" required username/></label>' +
                    '<div class="error-div" ng-show="form.$submitted || form.Uname.$touched">' +
                    '<div class="error-message" id="name-empty-msg" ng-show="form.Uname.$error.required">&nbsp;{{translation.REQUIRED_FIELD}}</div>' +
                    '</div>' +
                    '<br /><br /><label><bold>{{translation.EMAIL}}:</bold>&nbsp;<input id="user-name" type="email" ng-model="user.email" name="Uemail" required email/></label>' +
                    '<div class="error-div" ng-show="form.$submitted || form.Uemail.$touched">' +
                    '<span  class="error-message" id="email-empty-msg" ng-show="form.Uemail.$error.required">&nbsp;{{translation.REQUIRED_FIELD}}</span>' +
                    '<span  class="error-message" id="email-validation-msg" ng-show="form.Uemail.$dirty && form.Uemail.$error.email">&nbsp;{{translation.INVALID_EMAIL}}</span>' +
                    '</div>' +
                    '<br /><br /><label><bold>{{translation.SWEDISH_IBAN}}:</bold>&nbsp;<input id="user-ibanaccount" type="text" ng-model="user.ibanaccount" name="Uibanaccount" required ibanaccount/></label>' +
                    '<div class="error-div" ng-show="form.$submitted || form.Uibanaccount.$touched">' +
                    '<span  class="error-message" id="iban-empty-msg" ng-show="form.Uibanaccount.$error.required">&nbsp;{{translation.REQUIRED_FIELD}}</span>' +
                    '<span  class="error-message" id="iban-validation-msg" ng-show="form.Uibanaccount.$dirty && form.Uibanaccount.$error.ibanaccount">&nbsp;{{translation.INVALID_IBAN}}</span>' +
                    '</div>' +
                    '<br /><br /><input type="button" ng-click="reset()" value="{{translation.FORM_RESET}}"/>' +
                    '<input type="submit" ng-disabled="form.$invalid" value="{{translation.FORM_SAVE}}"/>' +
                    '</form>'
        };
    });

    //Email REGEXP test
    formApp.directive('email', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, atts, ctrl) {
                ctrl.$validators.email = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (EMAIL_REGEXP.test(viewValue)) {
                        return true;
                    }
                    return false;
                };
            }

        };
    });
    // Swedish IBAN account number REGEXP test
    formApp.directive('ibanaccount', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, atts, ctrl) {
                ctrl.$validators.ibanaccount = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (SWEDISH_IBAN.test(viewValue)) {
                        return true;
                    }
                    return false;
                };
            }

        };
    });
}
else {
    alert('Angular is not defined');
}