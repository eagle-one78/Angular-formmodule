# Angular-formmodule
Angular Form module

1- Change the Module name to your own name in formManager.js example:
```<html ng-app="YourModule">```
will be:
formApp = angular.module('YourModule', ['ngResource']);

2 - Add the Form module script tag at before the </body> closing tag: 
```<script type="text/javascript" src="js/app/formManager.js" ></script>```

3- Add the minimum markup needed to start this module is:

```<element1 ng-controller="FormController"><element2 registration-form></element2></element1>```
