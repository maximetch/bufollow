<div ng-show="vm.error" class="alert alert-danger">{{vm.error}}</div>
<form class="col s12" name="form" ng-submit="vm.login()" role="form" novalidate>
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input class="mdl-textfield__input" type="text" id="name" ng-model="vm.name" required/>
    <label class="mdl-textfield__label" for="name">Username / email</label>
  </div>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input class="mdl-textfield__input" type="password" id="password" ng-model="vm.password" required/>
    <label class="mdl-textfield__label" for="password">Password</label>
  </div>

  <div class="row form-actions col s12">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" ng-disabled="form.$invalid || vm.dataLoading" >
      Login
    </button>
    <a href="#/register" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Register</a>
  </div>
</form>